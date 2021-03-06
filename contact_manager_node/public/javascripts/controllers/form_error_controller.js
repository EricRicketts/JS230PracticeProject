let FormErrorController = {
  initializeAllFormInputs: function(form) {
    this.form = form;
    this.nameInput = this.form.querySelector('input[name=full_name]');
    this.emailInput = this.form.querySelector('input[name=email]');
    this.phoneNumberInput = this.form.querySelector('input[name=phone_number]');
    return Array.of(this.nameInput, this.emailInput, this.phoneNumberInput);
  },
  isValid: function(input) {
    if (input.validity.valueMissing) {
      this.noInputError(input);
      return false;
    } else if (input.validity.patternMismatch) {
      this.patternMismatchError(input);
      return false;
    }

    return true;
  },
  noInputError: function(input) {
    let errorStr = this.noInputErrorMessages[input.name];
    this.app.view.errorMessage(input, errorStr);
  },
  patternMismatchError: function(input) {
    let errorStr = this.patternMismatchMessages[input.name];
    this.app.view.errorMessage(input, errorStr);
  },
  verifyAllInputs: function(form) {
    this.allFormInputs = this.initializeAllFormInputs(form);
    return this.allFormInputs.reduce((inputStatus, input) => {
      inputStatus.push(this.isValid(input));
      return inputStatus;
    }, []).every(status => status);
  },
  init: function(contactApp) {
    this.app = contactApp;
    this.noInputErrorMessages = {
      'full_name': 'A full name is required.',
      'email': 'An email is required.',
      'phone_number': 'A phone number is required.'
    };
    this.patternMismatchMessages = {
      'full_name': 'Enter a valid name, at least two letters.',
      'email': 'Enter a valid email, pattern is *@*.',
      'phone_number': 'Enter a valid phone number, 10 digits.'
    };
    return this;
  }
}

export { FormErrorController };