import { equals } from 'expect/build/jasmine_utils';
import diff from 'jest-diff';
import {
  matcherHint,
  printExpected,
  printReceived,
  RECEIVED_COLOR,
} from 'jest-matcher-utils';

export const toHaveBeenRequestedWith = (
  { mock }: jest.Mock<any>,
  expected: object,
) => {
  const calls = mock.calls;
  const pass = calls.length > 0 && equals(calls[0][0].request, expected);
  return {
    pass,
    message: () => {
      const hintString = matcherHint('.toHaveBeenRequestedWith');
      const expectedString = printExpected(expected);
      const mismatchString = formatMismatchedCalls(mock.calls, expected);
      return (
        `${hintString}\n\n` +
        `Expected request value to equal:\n${expectedString}\n` +
        mismatchString
      );
    },
  };
};

const formatMismatchedCalls = (calls, expected): string => {
  if (!calls.length) {
    return `But it was ${RECEIVED_COLOR('not called')}.`;
  }

  const received = calls[0][0].request;
  const diffString = diff(expected, received);
  const receivedString = printReceived(received);
  return `Received:\n${receivedString}\n` + `Difference:\n${diffString}`;
};
