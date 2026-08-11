import { apiRequest } from '../api-client';
import { ApiError } from '../api-error';

describe('apiRequest', () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('returns parsed JSON for successful responses', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
      }),
    }) as unknown as typeof fetch;

    const result = await apiRequest<{
      success: boolean;
    }>('https://example.com');

    expect(result).toEqual({
      success: true,
    });
  });

  it('throws an HTTP ApiError for failed responses', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({
        message: 'Server failed',
      }),
    }) as unknown as typeof fetch;

    await expect(apiRequest('https://example.com')).rejects.toMatchObject({
      message: 'Server failed',
      status: 500,
      code: 'HTTP',
    });
  });

  it('converts fetch TypeError into NETWORK ApiError', async () => {
    globalThis.fetch = jest
      .fn()
      .mockRejectedValue(new TypeError('Network request failed')) as unknown as typeof fetch;

    await expect(apiRequest('https://example.com')).rejects.toMatchObject({
      code: 'NETWORK',
    });
  });

  it('throws existing ApiError instances unchanged', async () => {
    const apiError = new ApiError('Known failure', 400, 'HTTP');

    globalThis.fetch = jest.fn().mockRejectedValue(apiError) as unknown as typeof fetch;

    await expect(apiRequest('https://example.com')).rejects.toBe(apiError);
  });
});
