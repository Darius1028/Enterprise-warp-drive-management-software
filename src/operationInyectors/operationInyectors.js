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

  if (!Array.isArray(injectorsState))
    throw new Error('parameter must be array');

  if (injectorsState.length === 0)
    throw new Error('parameter must not be a empty');

  const injectorsFlux = getFluxInyectors(injectorsState, speedPercent);
  const maxTime = maxTimeOperation(injectorsFlux, speedPercent);
 
  return { injectorsFlux, maxTime };
};

const getMedianFlux = (injectorsState, speedPercent) => {
  let totalDamage = 0;
  let disabledInjectorDamage = 0;
  let enabledInjectors = 0;

  injectorsState.forEach( injector => {
    const { damage = 0 } = injector;

    if (damage <= MAX_DAMAGE) {
      enabledInjectors += 1;
      totalDamage += damage;
    } else {
      disabledInjectorDamage += speedPercent;
    }
  });

  if (totalDamage > MAX_PERCENTAGE) {
    return false;
  }
  
  const median = speedPercent - (enabledInjectors * speedPercent - totalDamage) / enabledInjectors;
  const overFlux = disabledInjectorDamage / enabledInjectors;

  return median + overFlux;
};

const getFluxInyectors = (injectors, speedPercent) => {
  const medianFlux = getMedianFlux(injectors, speedPercent);

  if (medianFlux === false) return { error: UNABLE };

  const fluxInyectors = injectors.map(injector => {
    const { damage = 0 } = injector;
    const flux = damage > MAX_DAMAGE ? 0 : speedPercent - damage + medianFlux;
    return flux;
  });

  return fluxInyectors;
};

const maxTimeOperation = (injectors, speedPercent) => {
  let overworked = 0;
  let overworkedInjectors = 0;

  const { error } = injectors;

  if (error) return 0;

  injectors.forEach(flux => {
    if (flux > speedPercent) {
      overworked += MAX_OVERWORK - flux;
      overworkedInjectors += 1;
    }
  });

  const time = overworked / overworkedInjectors;

  return Number.isNaN(time) ? INFINITE : time;
};
