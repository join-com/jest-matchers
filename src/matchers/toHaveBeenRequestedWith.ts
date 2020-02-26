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
  const pass = calls.length > 0 && anyOfRequestsSuccedeed(calls, expected);
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

  const messages: string[] = ['Received:'];
  calls.map((call, index) => {
    const received = call[0].request;
    const diffString = diff(expected, received);

    const receivedString = printReceived(received);
    const callNumber: string =
      calls.length > 1 ? `call no.${String(index + 1)}` : '';

    const callMessage =
      'Received: \n' +
      `${callNumber}\n` +
      `${receivedString}\n` +
      'Difference:\n' +
      `${diffString}`;

    messages.push(callMessage);
  });

  if (calls.length > 1) {
    messages.push(`\nNumber of calls: ${calls.length}`);
  }
  return messages.join('\n');
};

const anyOfRequestsSuccedeed = (calls: any[], expected: object): boolean => {
  return calls.reduce((acc: number[], call: any) => {
    return acc || equals(call[0].request, expected);
  }, false);
};
