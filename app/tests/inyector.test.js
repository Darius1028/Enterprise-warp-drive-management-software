import {
  inyector,
  initialInjectorState,
  initialInjectorsState,
  MAX_PERCENTAGE,
  UNABLE,
  INFINITE,
} from '../components/inyector';

export const mockInjector = {
  damage: 0,
};

export const mockInjectors = {
  A: { ...mockInjector },
  B: { ...mockInjector },
  C: { ...mockInjector },
};

describe('inyector', () => {
  it('should have and initial state initialInjectorState set', () => {
    const mock = { ...initialInjectorState };
    expect(mockInjector).toEqual(mock);
  });

  it('should have and initial state initialInjectorsState set', () => {
    const mock = { ...initialInjectorsState };
    expect(mockInjectors).toEqual(mock);
  });

  it('should be a function', () => {
    expect(typeof inyector).toBe('function');
  });

  it('should throw if not object injectorsState is provided as parameter', () => {
    expect(() => inyector()).toThrow();
  });

  it('should throw a specific error message not a object is provided', () => {
    expect(() => inyector(NaN)).toThrow('parameter must be a object');
  });

  it('should throw a specific error message when object provided is empty', () => {
    expect(() => inyector({})).toThrow('parameter must not be a empty');
  });

  it('should return object if parameter provider is object', () => {
    expect(typeof inyector(mockInjectors)).toBe('object');
  });
  describe('when receive parameter injectorState ', () => {
    it('default parameters return equal values  ', () => {
      const { resultFlux, time } = inyector(mockInjectors);
      const result = { flux: MAX_PERCENTAGE };
      expect(resultFlux).toEqual(expect.objectContaining({ A: { ...result } }));
      expect(resultFlux).toEqual(expect.objectContaining({ B: { ...result } }));
      expect(resultFlux).toEqual(expect.objectContaining({ C: { ...result } }));
      expect(time).toEqual(INFINITE);
    });
    it('parameter speed 90 return values', () => {
      const speed = 90;
      const { resultFlux } = inyector(mockInjectors, speed);
      const result = { flux: speed };
      expect(resultFlux).toEqual(expect.objectContaining({ A: { ...result } }));
      expect(resultFlux).toEqual(expect.objectContaining({ B: { ...result } }));
      expect(resultFlux).toEqual(expect.objectContaining({ C: { ...result } }));
    });
    it('parameter speed 30 return values', () => {
      const speed = 30;
      const { resultFlux, time } = inyector(mockInjectors, speed);
      const result = { flux: speed };
      expect(resultFlux).toEqual(expect.objectContaining({ A: { ...result } }));
      expect(resultFlux).toEqual(expect.objectContaining({ B: { ...result } }));
      expect(resultFlux).toEqual(expect.objectContaining({ C: { ...result } }));
      expect(time).toEqual(INFINITE);
    });
    it('parameter speed 100 and  A:20 B:10 return values', () => {
      const speed = 100;
      const elems = {
        A: { damage: 20 },
        B: { damage: 10 },
        C: { ...mockInjector },
      };
      const { resultFlux, time } = inyector(elems, speed);
      expect(resultFlux).toEqual(expect.objectContaining({ A: { flux: 90 } }));
      expect(resultFlux).toEqual(expect.objectContaining({ B: { flux: 100 } }));
      expect(resultFlux).toEqual(expect.objectContaining({ C: { flux: 110 } }));
      expect(time).toEqual(90);
    });
    it('parameter speed 80 and C:100 return values', () => {
      const speed = 80;
      const elems = {
        A: { ...mockInjector },
        B: { ...mockInjector },
        C: { damage: 100 },
      };
      const { resultFlux, time } = inyector(elems, speed);
      expect(resultFlux).toEqual(expect.objectContaining({ A: { flux: 120 } }));
      expect(resultFlux).toEqual(expect.objectContaining({ B: { flux: 120 } }));
      expect(resultFlux).toEqual(expect.objectContaining({ C: { flux: 0 } }));
      expect(time).toEqual(80);
    });
    it('parameter speed 150 return values', () => {
      const speed = 150;
      const { resultFlux, time } = inyector(mockInjectors, speed);
      const result = { flux: speed };
      expect(resultFlux).toEqual(expect.objectContaining({ A: { ...result } }));
      expect(resultFlux).toEqual(expect.objectContaining({ B: { ...result } }));
      expect(resultFlux).toEqual(expect.objectContaining({ C: { ...result } }));
      expect(time).toEqual(INFINITE);
    });
    it('parameter speed 140 and c:30 return values', () => {
      const speed = 140;
      const elems = {
        A: { ...mockInjector },
        B: { ...mockInjector },
        C: { damage: 30 },
      };
      const { resultFlux, time } = inyector(elems, speed);
      expect(resultFlux).toEqual(expect.objectContaining({ A: { flux: 150 } }));
      expect(resultFlux).toEqual(expect.objectContaining({ B: { flux: 150 } }));
      expect(resultFlux).toEqual(expect.objectContaining({ C: { flux: 120 } }));
      expect(time).toEqual(50);
    });
    it('parameter speed 170 and A:20, B:50, C: 40 return values', () => {
      const speed = 170;
      const elems = {
        A: { damage: 20 },
        B: { damage: 50 },
        C: { damage: 40 },
      };
      const { resultFlux, time } = inyector(elems, speed);
      expect(resultFlux).toEqual(expect.objectContaining({ error: UNABLE }));
      expect(time).toEqual(0);
    });
  });
});
