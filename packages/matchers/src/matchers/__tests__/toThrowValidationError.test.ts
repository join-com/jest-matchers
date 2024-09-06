import { IFieldError, ValidationError } from '../../ValidationError'
import { toThrowValidationError } from '../toThrowValidationError'

expect.extend({ toThrowValidationError })

describe('toThrowValidationError', () => {
  const expectedValidationError = (partialFieldError?: Partial<IFieldError>) =>
    new ValidationError('Expected validation error', [
      {
        fieldName: 'someField',
        constraint: 'mustBeCorrect',
        message: 'Some field must be correct but its not',
        ...partialFieldError,
      },
    ])

  it('passes for function throwing expected ValidationError', async () => {
    const fn = () => {
      throw expectedValidationError()
    }

    await expect(fn).toThrowValidationError(expectedValidationError())
  })

  it('passes for directly passing the expected ValidationError', async () => {
    await expect(expectedValidationError()).toThrowValidationError(expectedValidationError())
  })

  it('fails when error is not thrown', async () => {
    const fn = () => {
      /** Do nothing */
    }

    const validate = async () => {
      await expect(fn).toThrowValidationError(expectedValidationError())
    }

    await expect(validate).rejects.toThrowErrorMatchingSnapshot()
  })

  it('fails for error of other type', async () => {
    const fn = () => {
      throw new Error('other type')
    }

    const validate = async () => {
      await expect(fn).toThrowValidationError(expectedValidationError())
    }

    await expect(validate).rejects.toThrowErrorMatchingSnapshot()
  })

  it('fails for ValidationError with different fieldName', async () => {
    const fn = () => {
      const error = expectedValidationError({ fieldName: 'different' })
      throw error
    }

    const validate = async () => {
      await expect(fn).toThrowValidationError(expectedValidationError())
    }

    await expect(validate).rejects.toThrowErrorMatchingSnapshot()
  })

  it('fails for ValidationError with different constraint', async () => {
    const fn = () => {
      const error = expectedValidationError({ constraint: 'different' })
      throw error
    }

    const validate = async () => {
      await expect(fn).toThrowValidationError(expectedValidationError())
    }
    await expect(validate).rejects.toThrowErrorMatchingSnapshot()
  })

  it('fails for ValidationError with different message', async () => {
    const fn = () => {
      const error = expectedValidationError({ message: 'different' })
      throw error
    }

    const validate = async () => {
      await expect(fn).toThrowValidationError(expectedValidationError())
    }

    await expect(validate).rejects.toThrowErrorMatchingSnapshot()
  })

  it('fails for ValidationError with additional fields', async () => {
    const fn = () => {
      const error = expectedValidationError()
      error.fields[1] = {
        fieldName: 'someOtherField',
        constraint: 'mustBeCorrectToo',
        message: 'Some other field must be correct but its not',
      }
      throw error
    }

    const validate = async () => {
      await expect(fn).toThrowValidationError(expectedValidationError())
    }

    await expect(validate).rejects.toThrowErrorMatchingSnapshot()
  })

  it('fails for ValidationError with no fields', async () => {
    const fn = () => {
      const error = expectedValidationError()
      error.fields.pop()
      throw error
    }

    const validate = async () => {
      await expect(fn).toThrowValidationError(expectedValidationError())
    }

    await expect(validate).rejects.toThrowErrorMatchingSnapshot()
  })

  it('fails for ValidationError with different fields', async () => {
    const fn = () => {
      const error = expectedValidationError()
      error.fields[0] = {
        fieldName: 'someOtherField',
        constraint: 'mustBeCorrectToo',
        message: 'Some other field must be correct but its not',
      }
      throw error
    }

    const validate = async () => {
      await expect(fn).toThrowValidationError(expectedValidationError())
    }

    await expect(validate).rejects.toThrowErrorMatchingSnapshot()
  })
})
