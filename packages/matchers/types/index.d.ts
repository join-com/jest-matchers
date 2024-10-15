/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    toHaveBeenRequestedWith(value: any): object
    toMatchGqlResponseData<E extends object>(expected: E): object
    toThrowValidationError(value: Error): CustomMatcherResult | Promise<CustomMatcherResult>
  }

  interface Expect {
    toHaveBeenRequestedWith(value: any): object
    toThrowValidationError(value: Error): CustomMatcherResult | Promise<CustomMatcherResult>
  }
}
