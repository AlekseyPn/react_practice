export function createControl(config, validation) {
  return {
    ...config,
    valid: !validation,
    touched: false,
    value: '',
    validation,
  };
}

export function validate(value, validation = null) {
  if (!validation) {
    return true;
  }

  let isValid = true;

  if (validation.required) {
    isValid = !!value.trim() && isValid;
  }

  return isValid;
}

export function validateForm(formControls) {
  let isFormValid = true;

  for (let controlName in formControls) {
    if (!Object.prototype.hasOwnProperty.call(formControls, controlName)) {
      if (!isFormValid) {
        break;
      }
      isFormValid = formControls[controlName].valid;
    }
  }
  return isFormValid;
}
