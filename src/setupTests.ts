import 'abort-controller/polyfill';
import '@testing-library/jest-dom/extend-expect';

afterEach(async () => {
  // Restores fn.mock.{calls,results,instances} for all mock functions
  jest.clearAllMocks();

  // Restores spies to the original functions
  jest.restoreAllMocks();
});
