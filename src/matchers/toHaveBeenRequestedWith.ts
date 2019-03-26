import { equals } from 'expect/build/jasmineUtils';
import diff from 'jest-diff';
import {
  matcherHint,
  printExpected,
  printReceived,
  RECEIVED_COLOR,
} from 'jest-matcher-utils';

interface Mock {
  mock: {
    calls: any[];
  };
}

export const toHaveBeenRequestedWith = ({ mock }: Mock, expected: object) => {
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

const formatMismatchedCalls = (calls: any[], expected: object): string => {
  if (!calls.length) {
    return `But it was ${RECEIVED_COLOR('not called')}.`;
  }

  const received = calls[0][0].request;
  const diffString = diff(expected, received);
  const receivedString = printReceived(received);
  return `Received:\n${receivedString}\n` + `Difference:\n${diffString}`;
};
