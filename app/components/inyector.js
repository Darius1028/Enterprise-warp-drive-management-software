export const MAX_PERCENTAGE = 100;
export const UNABLE = 'Unable to comply';
export const INFINITE = 'Infinite';

export const initialInjectorState = {
  damage: 0,
};
export const initialInjectorsState = {
  A: { ...initialInjectorState },
  B: { ...initialInjectorState },
  C: { ...initialInjectorState },
};

export const inyector = (injectorsState, speedPercentage = 100) => {
  if (typeof injectorsState !== 'object')
    throw new Error('parameter must be a object');

  if (Object.keys(injectorsState).length === 0)
    throw new Error('parameter must not be a empty');

  const resultFlux = getFluxInyector(injectorsState, speedPercentage);
  const time = getTime(resultFlux, speedPercentage);
  return { resultFlux, time };
};

export const getConstant = (injectorsState, speed) => {
  let totalDamage = 0;
  let deadInyector = 0;
  let numInyector = 0;

  Object.keys(injectorsState).forEach(key => {
    const { damage } = injectorsState[key];
    if (damage < 100) {
      numInyector += 1;
      totalDamage += damage;
    } else {
      deadInyector += speed;
    }
  });

  if (totalDamage > MAX_PERCENTAGE) {
    return false;
  }

  const overFlux = speed - (numInyector * speed - totalDamage) / numInyector;
  const underFlux = deadInyector / numInyector;

  return overFlux + underFlux;
};

export const getFluxInyector = (injectorsState, speed) => {
  const constant = getConstant(injectorsState, speed);

  if (constant === false) return { error: UNABLE };

  const obj = {};

  Object.keys(injectorsState).forEach(key => {
    const { damage } = injectorsState[key];
    const totalFlux = damage === 100 ? 0 : speed - damage + constant;
    obj[key] = { flux: totalFlux };
  });

  return obj;
};

export const getTime = (injectors, speed) => {
  let data = 0;
  let num = 0;
  const { error } = injectors;

  if (error) return 0;

  Object.keys(injectors).forEach(key => {
    const { flux } = injectors[key];
    if (flux > speed) {
      data += 200 - flux;
      num += 1;
    }
  });

  const time = data / num;

  return Number.isNaN(time) ? INFINITE : time;
};
