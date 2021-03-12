let FormErrorController = {
  duplicateTagError: function(input) {
    let errorStr = 'Duplicate tag, please choose another.';
    // this.app.view.errorMessage(input, errorStr);
    this.view.errorMessage(input, errorStr);
  },
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
    // this.app.view.errorMessage(input, errorStr);
    this.view.errorMessage(input, errorStr);
  },
  patternMismatchError: function(input) {
    let errorStr = this.patternMismatchMessages[input.name];
    // this.app.view.errorMessage(input, errorStr);
    this.view.errorMessage(input, errorStr);
  },
  tagPatternMismatchError(input) {
    let errorStr = this.patternMismatchMessages[input.id];
    // this.app.view.errorMessage(input, errorStr);
    this.view.errorMessage(input, errorStr);
  },
  verifyAllInputs: function(form) {
    this.allFormInputs = this.initializeAllFormInputs(form);
    return this.allFormInputs.reduce((inputStatus, input) => {
      inputStatus.push(this.isValid(input));
      return inputStatus;
    }, []).every(status => status);
  },
  verifyNewTag: function(inputElement, newTagValue) {
    if (inputElement.validity.patternMismatch || newTagValue.length === 0) {
      this.tagPatternMismatchError(inputElement);
      return false;
    // } else if (this.app.model.tagIsDuplicate(newTagValue)) {
    } else if (this.model.tagIsDuplicate(newTagValue)) {
      this.duplicateTagError(inputElement);
      return false;
    }
    return true;
  },
  init: function(contactApp) {
    // this.app = contactApp;
    Object.setPrototypeOf(this, contactApp);
    this.noInputErrorMessages = {
      'full_name': 'A full name is required.',
      'email': 'An email is required.',
      'phone_number': 'A phone number is required.'
    };
    this.patternMismatchMessages = {
      'full_name': 'Enter a valid name, at least two letters.',
      'email': 'Enter a valid email, pattern is *@*.',
      'phone_number': 'Enter a valid phone number, 10 digits.',
      'new_tag': 'Enter a valid tag, at least one letter or digit.'
    };
    return this;
  }
}

export { FormErrorController };