import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  let errorMessage = '';
  console.log(error)
  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Client-side error: ${error.error.message}`;
  } else {
    // Handle network or API unavailability
    if (error.status === 0 && error.message.includes('ERR_CONNECTION_REFUSED')) {
      // Handle connection refused
      errorMessage = 'API connection refused. Please ensure the server is running and try again.';
    } else if (error.status === 0) {
      // General network error (API unreachable)
      errorMessage = 'API is currently unavailable. Please check your network connection.';
    } else {
      // Handle other server-side errors
      errorMessage = `Server-side error: Error Code ${error.status}\nMessage: ${error.message}`;
    }
  }

  // Log the error to the console for debugging purposes
  // console.error('ERR:', errorMessage);

  // Return an observable with a user-facing error message
  return throwError(() => new Error(errorMessage));
}

export default handleError;