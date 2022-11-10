import {
  initialInjectorsState,
  MAX_PERCENTAGE,
  MAX_DAMAGE,
  MAX_OVERWORK,
  UNABLE,
  INFINITE,
} from './constants';

export const operationInyectors = (injectorsState = initialInjectorsState, speedPercent = MAX_PERCENTAGE) => {
  if (typeof injectorsState !== 'object')
    throw new Error('parameter must be a object');

  if (Object.keys(injectorsState).length === 0)
    throw new Error('parameter must not be a empty');

  const injectorsFlux = getFluxInyectors(injectorsState, speedPercent);
  const maxTime = maxTimeOperation(injectorsFlux, speedPercent);
  return { injectorsFlux, maxTime };
};

const getMedianFlux = (injectorsState, speedPercent) => {
  let totalDamage = 0;
  let disabledInjectors = 0;
  let enabledInjectors = 0;

  Object.keys(injectorsState).forEach(key => {
    const { damage } = injectorsState[key];
    if (damage <= MAX_DAMAGE) {
      enabledInjectors += 1;
      totalDamage += damage;
    } else {
      disabledInjectors += speedPercent;
    }
  });

  if (totalDamage > MAX_PERCENTAGE) {
    return false;
  }

  const median = speedPercent - (enabledInjectors * speedPercent - totalDamage) / enabledInjectors;
  const overFlux = disabledInjectors / enabledInjectors;

  return median + overFlux;
};

const getFluxInyectors = (injectors, speedPercent) => {
  const medianFlux = getMedianFlux(injectors, speedPercent);

  if (medianFlux === false) return { error: UNABLE };

  const fluxInyectors  = {};

  Object.keys(injectors).forEach(key => {
    const { damage } = injectors[key];
    const flux = damage > MAX_DAMAGE ? 0 : speedPercent - damage + medianFlux;
    fluxInyectors[key] = { flux };
  });

  return fluxInyectors;
};

const maxTimeOperation = (injectors, speedPercent) => {
  let overworked = 0;
  let overworkedInjectors = 0;
  const { error } = injectors;

  if (error) return 0;

  Object.keys(injectors).forEach(key => {
    const { flux } = injectors[key];
    if (flux > speedPercent) {
      overworked += MAX_OVERWORK - flux;
      overworkedInjectors += 1;
    }
  });

  const time = overworked / overworkedInjectors;

  return Number.isNaN(time) ? INFINITE : time;
};
