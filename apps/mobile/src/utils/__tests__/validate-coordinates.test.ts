import { validateCoordinates } from '../validate-coordinates';

describe('validateCoordinates', () => {
  it('accepts valid coordinates', () => {
    const coordinates = {
      latitude: 10.65,
      longitude: 122.96,
    };

    expect(validateCoordinates(coordinates)).toEqual(coordinates);
  });

  it('accepts boundary coordinates', () => {
    expect(
      validateCoordinates({
        latitude: 90,
        longitude: 180,
      }),
    ).toEqual({
      latitude: 90,
      longitude: 180,
    });

    expect(
      validateCoordinates({
        latitude: -90,
        longitude: -180,
      }),
    ).toEqual({
      latitude: -90,
      longitude: -180,
    });
  });

  it('rejects latitude above 90', () => {
    expect(() =>
      validateCoordinates({
        latitude: 91,
        longitude: 122,
      }),
    ).toThrow();
  });

  it('rejects latitude below -90', () => {
    expect(() =>
      validateCoordinates({
        latitude: -91,
        longitude: 122,
      }),
    ).toThrow();
  });

  it('rejects longitude above 180', () => {
    expect(() =>
      validateCoordinates({
        latitude: 10,
        longitude: 181,
      }),
    ).toThrow();
  });

  it('rejects longitude below -180', () => {
    expect(() =>
      validateCoordinates({
        latitude: 10,
        longitude: -181,
      }),
    ).toThrow();
  });

  it('rejects non-finite coordinates', () => {
    expect(() =>
      validateCoordinates({
        latitude: Number.NaN,
        longitude: 122,
      }),
    ).toThrow();

    expect(() =>
      validateCoordinates({
        latitude: 10,
        longitude: Number.POSITIVE_INFINITY,
      }),
    ).toThrow();
  });
});
