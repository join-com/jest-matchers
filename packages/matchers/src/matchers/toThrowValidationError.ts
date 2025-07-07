import equal from 'fast-deep-equal'
import { printDiffOrStringify } from 'jest-matcher-utils'
import { ValidationError } from '../ValidationError'

function getThrown(received: Error | (() => void)): Error | undefined {
  if (received instanceof Error) {
    return received
  }

  try {
    received()
  } catch (error) {
    return error as Error
  }

  return
}

export function toThrowValidationError<T extends ValidationError>(
  received: Error | (() => void),
  expected: T,
): jest.CustomMatcherResult {
  const thrown = getThrown(received)
  if (!thrown) {
    return {
      pass: false,
      message: () => 'Expected to receive an error or a function that throws an error',
    }
  }

  const isExpectedClass = thrown instanceof expected.constructor
  if (!isExpectedClass) {
    return {
      pass: false,
      message: () =>
        `Expected error to be an instance of ${expected.constructor.name} but got ${thrown.constructor.name}`,
    }
  }

  const receivedFields = (thrown as ValidationError).fields
  const areFieldsMatching = equal(receivedFields, expected.fields)
  if (!areFieldsMatching) {
    return {
      pass: false,
      message: () => printDiffOrStringify(receivedFields, expected.fields, 'Expected fields', 'Received fields', true),
    }
  }

  return { pass: true, message: () => '' }
}
