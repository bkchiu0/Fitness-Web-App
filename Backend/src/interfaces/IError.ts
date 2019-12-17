export enum ErrorType {
  Authorization = 401,
  Internal = 500,
  Validation = 400
}

export interface IError {
  type: ErrorType;
  message: String;
}
