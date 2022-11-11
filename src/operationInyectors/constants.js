export const MAX_PERCENTAGE = 100;
export const MAX_DAMAGE = 99;
export const MAX_OVERWORK = 200;
export const UNABLE = 'Unable to comply';
export const INFINITE = 'Infinite';

export const initialInjectorState = {
  damage: 0,
};
export const initialInjectorsState = [
  { ...initialInjectorState },
  { ...initialInjectorState },
  { ...initialInjectorState },
];