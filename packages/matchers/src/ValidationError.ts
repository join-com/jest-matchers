export interface IFieldError {
  fieldName: string
  message: string
  constraint: string
}

export class ValidationError extends Error {
  public readonly type = 'ApplicationError'
  public readonly code = 'validation'

  constructor(
    message: string,
    public readonly fields: IFieldError[],
  ) {
    super(message)
  }
}
