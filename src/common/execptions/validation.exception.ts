import { BadRequestException } from "@nestjs/common/exceptions";
import { ValidationError } from "class-validator";

export default (errors: ValidationError[]) => {
    const formatError = (errors: ValidationError[]) => {
      const errMsg = {};
      errors.forEach((error: ValidationError) => {
        errMsg[error.property] = error.children.length
          ? [formatError(error.children)]
          : [...Object.values(error.constraints)];
      });
      return errMsg;
    };
    return new ValidationException({
        message: "There was a problem with your submission.",
        errors: formatError(errors)
    });
  };

  export class ValidationException extends BadRequestException {
    constructor(public validationErrors: Record<string, unknown>) {
      super(validationErrors);
    }
  }