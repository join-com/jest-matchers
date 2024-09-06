import { diff, matcherHint, printExpected, printReceived, RECEIVED_COLOR } from 'jest-matcher-utils'

type ICallWithRequest = [{ request: Record<string, unknown> }]

interface IMock {
  mock: {
    calls: ICallWithRequest[]
  }
}

export const toHaveBeenRequestedWith = ({ mock }: IMock, expected: unknown): jest.CustomMatcherResult => {
  const calls = mock.calls
  const pass = calls.length > 0 && anyOfRequestsSucceeded(calls, expected)
  return {
    pass,
    message: () => {
      const hintString = matcherHint('.toHaveBeenRequestedWith')
      const expectedString = printExpected(expected)
      const mismatchString = formatMismatchedCalls(mock.calls, expected)
      return `${hintString}\n\n` + `Expected request value to equal:\n${expectedString}\n` + mismatchString
    },
  }
}

const formatMismatchedCalls = (calls: ICallWithRequest[], expected: unknown): string => {
  if (!calls.length) {
    return `But it was ${RECEIVED_COLOR('not called')}.`
  }

  const messages: string[] = ['Received:']
  calls.map((call, index) => {
    const received = call[0].request
    const diffString = diff(expected, received) ?? ''

    const receivedString = printReceived(received)
    const callNumber: string = calls.length > 1 ? `\ncall no.${String(index + 1)}\n` : ''
    const callMessage = `${callNumber}` + `${receivedString}\n` + 'Difference:\n' + `${diffString}`

    messages.push(callMessage)
  })

  if (calls.length > 1) {
    messages.push(`\nNumber of calls: ${calls.length}`)
  }
  return messages.join('\n')
}

const anyOfRequestsSucceeded = (calls: ICallWithRequest[], expected: unknown): boolean => {
  for (const call of calls) {
    if (equal(call[0].request, expected)) {
      return true
    }
  }
  return false
}

const equal = (request: Record<string, unknown>, expected: unknown): boolean => {
  try {
    expect(request).toEqual(expected)
    return true
  } catch (e) {
    return false
  }
}
