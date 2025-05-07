// Mock localStorage
if (typeof window !== "undefined") {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  })
}

// Mock IndexedDB
if (typeof window !== "undefined") {
  const indexedDB = {
    open: jest.fn(),
    deleteDatabase: jest.fn(),
  }

  Object.defineProperty(window, "indexedDB", {
    value: indexedDB,
    writable: true,
  })
}

// Mock fetch
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(""),
  }),
)

// Mock console methods
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}

// Setup for inversify
require("reflect-metadata")
