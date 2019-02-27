import { toHaveBeenRequestedWith } from '../../src/matchers/toHaveBeenRequestedWith';

expect.extend({ toHaveBeenRequestedWith });

describe('toHaveBeenRequestedWith', () => {
  const mockFn = jest.fn();

  const request = {
    a: 1,
    b: 2,
  };

  beforeEach(() => {
    mockFn.mockClear();
  });

  it('passes when mock was called with request', () => {
    mockFn({ request });

    expect(mockFn).toHaveBeenRequestedWith({
      a: 1,
      b: 2,
    });
  });

  it('fails when mock was not called', () => {
    const validate = () => {
      expect(mockFn).toHaveBeenRequestedWith({
        a: 1,
        b: 2,
      });
    };

    expect(validate).toThrowErrorMatchingSnapshot();
  });

  it('fails when mock was called with different values', () => {
    mockFn({ request });

    const validate = () => {
      expect(mockFn).toHaveBeenRequestedWith({
        a: 1,
        b: 1,
      });
    };

    expect(validate).toThrowErrorMatchingSnapshot();
  });
});
