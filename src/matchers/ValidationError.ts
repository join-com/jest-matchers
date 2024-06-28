export class ValidationError extends Error {
  public readonly type = 'ApplicationError';
  public readonly code = 'validation';

  constructor(
    message: string,
    public readonly fields: {
      fieldName: string;
      message: string;
      constraint: string;
    }[],
  ) {
    super(message);
  }
}
