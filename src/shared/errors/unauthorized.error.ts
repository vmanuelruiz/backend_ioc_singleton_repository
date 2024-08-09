export class UnauthorizedError extends Error {

    name = 'Unauthorized';
    status = 401;
  
    constructor(message: string) {
      super(message);
  
      // Set the prototype explicitly.
      Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
  
  }
  