export class NotFoundError extends Error {

    name = 'NotFound';
    status = 404;
  
    constructor(message: string) {
      super(message);
  
      // Set the prototype explicitly.
      Object.setPrototypeOf(this, NotFoundError.prototype);
    }
  
  }
  