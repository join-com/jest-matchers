import { ValidationError } from '../../src/matchers/ValidationError';
import { toThrowValidationError } from '../../src/matchers/toThrowValidationError';

expect.extend({ toThrowValidationError });

describe('toThrowValidationError', () => {
  const expectedValidationError = () =>
    new ValidationError('Expected validation error', [
      {
        fieldName: 'someField',
        constraint: 'mustBeCorrect',
        message: 'Some field must be correct but its not',
      },
    ]);

  it('passess for function throwing expected ValidationError', () => {
    const fn = () => {
      throw expectedValidationError();
    };

    expect(fn).toThrowValidationError(expectedValidationError());
  });

  it('passess for directly passing the expected ValidationError', () => {
    expect(expectedValidationError()).toThrowValidationError(
      expectedValidationError(),
    );
  });

  it('fails when error is not thrown', () => {
    const fn = () => {};

    const validate = () => {
      expect(fn).toThrowValidationError(expectedValidationError());
    };
    expect(validate).toThrowErrorMatchingSnapshot();
  });

  it('fails for error of other type', () => {
    const fn = () => {
      throw new Error('other type');
    };

    const validate = () => {
      expect(fn).toThrowValidationError(expectedValidationError());
    };
    expect(validate).toThrowErrorMatchingSnapshot();
  });

  it('fails for ValidationError with different fieldName', () => {
    const fn = () => {
      const error = expectedValidationError();
      error.fields[0].fieldName = 'different';
      throw error;
    };

    const validate = () => {
      expect(fn).toThrowValidationError(expectedValidationError());
    };
    expect(validate).toThrowErrorMatchingSnapshot();
  });

  it('fails for ValidationError with different constraint', () => {
    const fn = () => {
      const error = expectedValidationError();
      error.fields[0].constraint = 'different';
      throw error;
    };

    const validate = () => {
      expect(fn).toThrowValidationError(expectedValidationError());
    };
    expect(validate).toThrowErrorMatchingSnapshot();
  });

  it('fails for ValidationError with different message', () => {
    const fn = () => {
      const error = expectedValidationError();
      error.fields[0].message = 'different';
      throw error;
    };

    const validate = () => {
      expect(fn).toThrowValidationError(expectedValidationError());
    };
    expect(validate).toThrowErrorMatchingSnapshot();
  });

  it('fails for ValidationError with additional fields', () => {
    const fn = () => {
      const error = expectedValidationError();
      error.fields[1] = {
        fieldName: 'someOtherField',
        constraint: 'mustBeCorrectToo',
        message: 'Some other field must be correct but its not',
      };
      throw error;
    };

    const validate = () => {
      expect(fn).toThrowValidationError(expectedValidationError());
    };
    expect(validate).toThrowErrorMatchingSnapshot();
  });

  it('fails for ValidationError with no fields', () => {
    const fn = () => {
      const error = expectedValidationError();
      error.fields.pop();
      throw error;
    };

    const validate = () => {
      expect(fn).toThrowValidationError(expectedValidationError());
    };
    expect(validate).toThrowErrorMatchingSnapshot();
  });

  it('fails for ValidationError with different fields', () => {
    const fn = () => {
      const error = expectedValidationError();
      error.fields[0] = {
        fieldName: 'someOtherField',
        constraint: 'mustBeCorrectToo',
        message: 'Some other field must be correct but its not',
      };
      throw error;
    };

    const validate = () => {
      expect(fn).toThrowValidationError(expectedValidationError());
    };
    expect(validate).toThrowErrorMatchingSnapshot();
  });
});
