import { StatusCodes } from 'http-status-codes';
import customAPIError from './custom-api.js';
class UnAuthenticatedError extends customAPIError {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthenticatedError;
