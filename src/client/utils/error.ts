export function showError(errMsg: string, error: Error) {
    console.log(errMsg, error);
    throw new Error(errMsg);
}