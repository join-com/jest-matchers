/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    toHaveBeenRequestedWith(value: any): object
    toThrowValidationError(value: Error): CustomMatcherResult | Promise<CustomMatcherResult>
  }

  interface Expect {
    toHaveBeenRequestedWith(value: any): object
    toThrowValidationError(value: Error): CustomMatcherResult | Promise<CustomMatcherResult>
  }
}
