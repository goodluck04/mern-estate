export const errorHandler = (statusCode, message) => {
    // js error constructor manually handling error
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error; // or throw erro

}