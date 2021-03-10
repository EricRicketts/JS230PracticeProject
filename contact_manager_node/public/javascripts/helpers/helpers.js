const contactAttributes = ['full_name', 'phone_number', 'email', 'tags'];
let Helpers = {
  addFocusListeners: function(form) {
    let desiredContactAttributes = contactAttributes.slice(0, 3);
    let desiredFormInputs = Array.from(form.querySelectorAll('input')).filter(inputElement => {
      return desiredContactAttributes.includes(inputElement.name) || inputElement.id === 'new_tag';
    });
    desiredFormInputs.forEach(input => {
      input.addEventListener('focus', event => {
        input.value = '';
        this.app.view.removeErrorMessage(event.target);
      });
    });
  },
  areThereNoAvailableTags: function(availableTagsSelect) {
    return Array.from(availableTagsSelect.options).length === 0;
  },
  formDataWithTags: function(tagsElement, formData) {
    let allTags = Array.from(tagsElement.options).map(option => option.value);
    let numberOfTags = allTags.length;
    if (numberOfTags === 1) {
      formData.tags = null;
    } else {
      formData.tags = allTags.slice(1, numberOfTags).join(',');
    }
  },
  formDataWithoutTags: function(form) {
    let formData = new FormData(form);
    return Array.from(formData.entries()).reduce((obj, keyValueArr) => {
      let [key, value] = [keyValueArr[0], keyValueArr[1]];
      if (key !== 'tags') {
        obj[key] = value.trim();
      }
      return obj;
    }, {});
  },
  convertDataToJson: function(form) {
    let tagsElement = form.querySelector('#tags');
    let formData = this.formDataWithoutTags(form);
    this.formDataWithTags(tagsElement, formData);
    return JSON.stringify(formData);
  },
  isInputInFocus: function(inputElement) {
    return inputElement === this.app.document.activeElement;
  },
  init: function(contactApp) {
    this.app = contactApp;
    return this;
  }
}

export { Helpers };