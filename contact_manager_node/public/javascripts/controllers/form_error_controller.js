let FormErrorController = {
  duplicateEntryError: function(input) {
    let errorStr = this.duplicateEntryErrorMessages[input.name];
    this.view.errorMessage(input, errorStr);
  },
  duplicateTagError: function(input) {
    let errorStr = 'Duplicate tag, please choose another.';
    this.view.errorMessage(input, errorStr);
  },
  initializeAllFormInputs: function(form) {
    this.form = form;
    this.nameInput = this.form.querySelector('input[name=full_name]');
    this.emailInput = this.form.querySelector('input[name=email]');
    this.phoneNumberInput = this.form.querySelector('input[name=phone_number]');
    return Array.of(this.nameInput, this.emailInput, this.phoneNumberInput);
  },
  isDuplicateEntry: function(input) {
    let key = input.name;
    let originalValue = this.editContactController.originalNonTagData[key];
    if (this.editForm && input.value.trim() === originalValue) {
      return false;
    }
    return this.model.allContacts.find(contact => {
      return contact[key] === input.value;
    });
  },
  isValid: function(input) {
    if (input.validity.valueMissing) {
      this.noInputError(input);
      return false;
    } else if (input.validity.patternMismatch) {
      this.patternMismatchError(input);
      return false;
    } else if (this.isDuplicateEntry(input)) {
      this.duplicateEntryError(input);
      return false;
    }
    return true;
  },
  noInputError: function(input) {
    let errorStr = this.noInputErrorMessages[input.name];
    this.view.errorMessage(input, errorStr);
  },
  patternMismatchError: function(input) {
    let errorStr = this.patternMismatchMessages[input.name];
    this.view.errorMessage(input, errorStr);
  },
  tagPatternMismatchError(input) {
    let errorStr = this.patternMismatchMessages[input.id];
    this.view.errorMessage(input, errorStr);
  },
  verifyAllInputs: function(form, editForm=false) {
    this.editForm = editForm;
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
    } else if (this.model.tagIsDuplicate(newTagValue)) {
      this.duplicateTagError(inputElement);
      return false;
    }
    return true;
  },
  init: function(contactApp) {
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
    this.duplicateEntryErrorMessages = {
      'full_name': 'That name already exists.',
      'email': 'That email already exists.',
      'phone_number': 'That phone numbers already exists.'
    }
    this.editForm = false;
    return this;
  }
}

export { FormErrorController };