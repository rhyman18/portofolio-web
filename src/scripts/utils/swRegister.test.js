import swRegister from './swRegister';

// use var to avoid temporal dead zone when jest hoists mocks
var mockRegister;

jest.mock('workbox-window', () => {
  mockRegister = jest.fn();
  return {
    Workbox: jest.fn(() => ({register: mockRegister})),
    __esModule: true,
  };
});

describe('swRegister', () => {
  const originalLog = console.log;

  beforeEach(() => {
    mockRegister.mockClear();
    delete navigator.serviceWorker;
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = originalLog;
  });

  it('registers service worker when supported', async () => {
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {},
      configurable: true,
    });

    await swRegister();
    expect(mockRegister).toHaveBeenCalled();
  });

  it('throws when service worker unsupported', async () => {
    await expect(swRegister()).rejects.toThrow(/Service Worker not supported/i);
  });

  it('throws user-friendly error when registration fails', async () => {
    Object.defineProperty(global.navigator, 'serviceWorker', {
      value: {},
      configurable: true,
    });
    mockRegister.mockRejectedValueOnce(new Error('register fail'));
    await expect(swRegister()).rejects.toThrow('Service worker registration failed');
  });
});
