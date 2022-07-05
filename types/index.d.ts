/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    toHaveBeenRequestedWith(value: any): object;
  }

  interface Expect {
    toHaveBeenRequestedWith(value: any): object;
  }
}
