import { diff, matcherHint, printExpected, printReceived } from 'jest-matcher-utils'

export interface IGqlResponse {
  body: {
    singleResult: {
      data?: unknown
    }
  }
}

export const toMatchGqlResponseData = <E extends object>(
  response: IGqlResponse,
  expectedData: E,
): jest.CustomMatcherResult => {
  const responseData = response.body.singleResult.data
  const pass = responseMatches(responseData, expectedData)
  return {
    pass,
    message: () => {
      const hintString = matcherHint('.toMatchGqlResponseData')
      const expectedString = printExpected(expectedData)
      const mismatchString = formatMismatched(responseData, expectedData)
      return `${hintString}\n\n` + `Expected response data to match:\n${expectedString}\n` + mismatchString
    },
  }
}

const formatMismatched = (responseData: unknown, expectedData: unknown): string => {
  const diffString = diff(responseData, expectedData) ?? ''

  const receivedString = printReceived(responseData)
  const message = `${receivedString}\n` + 'Difference:\n' + `${diffString}`

  return message
}

const responseMatches = <E extends object>(responseData: unknown, expectedData: E): boolean => {
  try {
    expect(responseData).toMatchObject(expectedData)
    return true
  } catch (_e) {
    return false
  }
}
