import { operationInyectors } from '../operationInyectors';
import {
  initialInjectorState,
  initialInjectorsState,
  MAX_PERCENTAGE,
  UNABLE,
  INFINITE,
} from '../constants';

export const mockInjector = {
  damage: 0,
};

export const mockInjectors = {
  A: { ...mockInjector },
  B: { ...mockInjector },
  C: { ...mockInjector },
};

describe('operationInyectors', () => {
  it('should be a function', () => {
    expect(typeof operationInyectors).toBe('function');
  });

  it('should throw a specific error message not a object is provided', () => {
    expect(() => operationInyectors(NaN)).toThrow('parameter must be a object');
  });

  it('should throw a specific error message when object provided is empty', () => {
    expect(() => operationInyectors({})).toThrow('parameter must not be a empty');
  });

  it('should have initial state "initialInjectorState" set', () => {
    const mock = { ...initialInjectorState };
    expect(mockInjector).toEqual(mock);
  });

  it('should have initial state "initialInjectorsState" set', () => {
    const mock = { ...initialInjectorsState };
    expect(mockInjectors).toEqual(mock);
  });
  
  it('should return object if parameter provider is object', () => {
    expect(typeof operationInyectors(mockInjectors)).toBe('object');
    expect(typeof operationInyectors( { test: "test" })).toBe('object');
  });


  describe('when receive parameter injectorsState and speedPercent', () => {
    
    it('default parameters should return equal values', () => {
      const { injectorsFlux, maxTime } = operationInyectors(mockInjectors);
      const result = { flux: MAX_PERCENTAGE };
      expect(injectorsFlux).toEqual(expect.objectContaining({ A: { ...result } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ B: { ...result } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ C: { ...result } }));
      expect(maxTime).toEqual(INFINITE);
    });

    it('parameter speed 90 should return values', () => {
      const speed = 90;
      const { injectorsFlux } = operationInyectors(mockInjectors, speed);
      const result = { flux: speed };
      expect(injectorsFlux).toEqual(expect.objectContaining({ A: { ...result } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ B: { ...result } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ C: { ...result } }));
    });
    it('parameter speed 30 should return values', () => {
      const speed = 30;
      const { injectorsFlux, maxTime } = operationInyectors(mockInjectors, speed);
      const result = { flux: speed };
      expect(injectorsFlux).toEqual(expect.objectContaining({ A: { ...result } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ B: { ...result } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ C: { ...result } }));
      expect(maxTime).toEqual(INFINITE);
    });
    it('parameter speed 100 and  injectorA:20 injectorB:10 return values', () => {
      const speed = 100;
      const elems = {
        A: { damage: 20 },
        B: { damage: 10 },
        C: { ...mockInjector },
      };
      const { injectorsFlux, maxTime } = operationInyectors(elems, speed);
      expect(injectorsFlux).toEqual(expect.objectContaining({ A: { flux: 90 } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ B: { flux: 100 } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ C: { flux: 110 } }));
      expect(maxTime).toEqual(90);
    });
    it('parameter speed 80 and injectorC:100 should return values', () => {
      const speed = 80;
      const elems = {
        A: { ...mockInjector },
        B: { ...mockInjector },
        C: { damage: 100 },
      };
      const { injectorsFlux, maxTime } = operationInyectors(elems, speed);
      expect(injectorsFlux).toEqual(expect.objectContaining({ A: { flux: 120 } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ B: { flux: 120 } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ C: { flux: 0 } }));
      expect(maxTime).toEqual(80);
    });
    it('parameter speed 150 should return values', () => {
      const speed = 150;
      const { injectorsFlux, maxTime } = operationInyectors(mockInjectors, speed);
      const result = { flux: speed };
      expect(injectorsFlux).toEqual(expect.objectContaining({ A: { ...result } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ B: { ...result } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ C: { ...result } }));
      expect(maxTime).toEqual(INFINITE);
    });
    it('parameter speed 140 and injectorC:30 should return values', () => {
      const speed = 140;
      const elems = {
        A: { ...mockInjector },
        B: { ...mockInjector },
        C: { damage: 30 },
      };
      const { injectorsFlux, maxTime } = operationInyectors(elems, speed);
      expect(injectorsFlux).toEqual(expect.objectContaining({ A: { flux: 150 } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ B: { flux: 150 } }));
      expect(injectorsFlux).toEqual(expect.objectContaining({ C: { flux: 120 } }));
      expect(maxTime).toEqual(50);
    });
    it('parameter speed 170 and injectorA:20, injectorB:50, injectorC: 40  should return values', () => {
      const speed = 170;
      const elems = {
        A: { damage: 20 },
        B: { damage: 50 },
        C: { damage: 40 },
      };
      const { injectorsFlux, maxTime } = operationInyectors(elems, speed);
      expect(injectorsFlux).toEqual(expect.objectContaining({ error: UNABLE }));
      expect(maxTime).toEqual(0);
    });
  });
});
