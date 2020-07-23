interface Validatable {
    value: string;
    required: boolean;
    maxLength?: number;
    minLength?: number;
}

export function isFieldValid(validatableInput: Validatable) : boolean{
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
        validatableInput.minLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
          isValid && validatableInput.value.length >= validatableInput.minLength;
      }
    if (
        validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    return isValid;
}

export function doesPasswordMatch(password: string, repeatedPassword: string) {
    return password === repeatedPassword ? true : false;
}