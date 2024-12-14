import { throwError } from 'rxjs';

export function handleError(error: string) {
  // let errorMessage: string | null = null;
  console.log(error)
  // if (error.error instanceof ErrorEvent) {
  //   // Client-side error
  //   errorMessage = `Client-side error: ${error.error.message}`;
  // } else {
  //   if (error.status === 0 && error.message.includes('ERR_CONNECTION_REFUSED')) {
  //     // Handle connection refused
  //     errorMessage = 'Connection refused. Please ensure the server is running and try again!';
  //   } else if (error.status === 0) {
  //     // General network error (API unreachable)
  //     errorMessage = 'API is currently unavailable. Please check your network connection!';
  //   } else {
  //     // Handle other server-side errors
  //     errorMessage = `Server-side error: Error Code ${error.status}\nMessage: ${error.message}`;
  //   }
  // }
  // Return an observable with a user-facing error message
  // errorMessage = error;
  return throwError(() => new Error(error));
  // return throwError(() => new Error(errorMessage));
}

export default handleError;