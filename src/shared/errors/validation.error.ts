export class ValidationError extends Error {

  name = 'ValidationError';
  status = 422;

  constructor(message: string, status?: number) {
    super(message);

    if (status) {
      this.status = status;
    }

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

}
