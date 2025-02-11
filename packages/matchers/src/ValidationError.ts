export interface IFieldError {
  constraint: string
  fieldName: string
  message: string
}

export class ValidationError extends Error {
  public readonly code = 'validation'
  public readonly type = 'ApplicationError'

  // eslint-disable-next-line
  constructor(
    message: string,
    public readonly fields: IFieldError[],
  ) {
    super(message)
  }
}
