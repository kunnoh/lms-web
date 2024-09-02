import { throwError } from "rxjs";

const handleError = (error: any) => {
    let errorMsg = '';
    console.log(error);
    if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMsg = error.error;
    } else {
        // Get server-side error
        errorMsg = error.error.error;
    };
    return throwError(() => {
        return errorMsg;
    });
};

export default handleError;