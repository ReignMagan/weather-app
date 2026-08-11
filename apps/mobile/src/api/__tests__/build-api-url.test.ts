import { buildApiUrl } from '../build-api-url';

describe('buildApiUrl', () => {
  it('builds a URL with query parameters', () => {
    const url = buildApiUrl('/weather', {
      latitude: 10.65,
      longitude: 122.96,
    });

    expect(url).toContain('/weather');
    expect(url).toContain('latitude=10.65');
    expect(url).toContain('longitude=122.96');
  });

  it('accepts a path without a leading slash', () => {
    const url = buildApiUrl('weather');

    expect(url).toContain('/weather');
  });

  it('skips null and undefined query values', () => {
    const url = buildApiUrl('/weather', {
      latitude: 10,
      optionalA: null,
      optionalB: undefined,
    });

    expect(url).toContain('latitude=10');
    expect(url).not.toContain('optionalA');
    expect(url).not.toContain('optionalB');
  });

  it('supports boolean query values', () => {
    const url = buildApiUrl('/weather', {
      enabled: true,
    });

    expect(url).toContain('enabled=true');
  });
});
