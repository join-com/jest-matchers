/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    toHaveBeenRequestedWith(value: object): object;
  }

  interface Expect {
    toHaveBeenRequestedWith(value: object): object;
  }
}
