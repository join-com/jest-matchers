import { equals } from 'expect/build/jasmine_utils';
import diff from 'jest-diff';
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';

export const toHaveBeenRequestedWith = (
  { mock }: jest.Mock<any>,
  expected: object,
) => {
  const received = { ...mock.calls[0][0].request };
  const pass = equals(received, expected);
  return {
    pass,
    message: () => {
      const diffString = diff(expected, received);
      const hintString = matcherHint('.toHaveBeenRequestedWith');
      const expectedString = printExpected(expected);
      const receivedString = printReceived(received);
      return (
        `${hintString}\n\n` +
        `Expected value to equal:\n${expectedString}\n` +
        `Received:\n${receivedString}\n` +
        `Difference:\n${diffString}`
      );
    },
  };
};
