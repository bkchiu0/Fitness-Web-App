import { ErrorType, IError } from "interfaces/IError";

class TypedError implements Error, IError {
  public readonly name: string;
  public readonly message: any;
  public readonly type: ErrorType;
  constructor(type: ErrorType, message: any, name?: string) {
    this.type = type;
    this.message = message;
    this.name = name;
  }
}

export default TypedError;
