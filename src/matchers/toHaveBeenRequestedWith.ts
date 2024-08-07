import equal from 'fast-deep-equal'
import {
  diff,
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

export const toHaveBeenRequestedWith = ({ mock }: Mock, expected: any) => {
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
      calls.length > 1 ? `\ncall no.${String(index + 1)}\n` : '';

    const callMessage =
      `${callNumber}` +
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

const anyOfRequestsSuccedeed = (calls: any[], expected: object): boolean =>
  calls.reduce(
    (acc: number[], call: any) => acc || equal(call[0].request, expected),
    false,
  );
