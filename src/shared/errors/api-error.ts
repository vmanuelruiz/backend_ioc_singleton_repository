export class APIError extends Error {

    name = 'APIError';
    status = 500;
  
    constructor(message: string, status?: number) {
      super(message);
  
      if (status) {
        this.status = status;
      }
  
      // Set the prototype explicitly.
      Object.setPrototypeOf(this, APIError.prototype);
    }
  
  }
  