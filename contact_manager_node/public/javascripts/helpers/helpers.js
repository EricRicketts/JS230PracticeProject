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
  convertDataToJson: function(form) {
    let tagsElement = form.querySelector('#tags');
    let formData = new FormData(form);
    let data = Array.from(formData.entries()).reduce((obj, keyValueArr) => {
      let [key, value] = [keyValueArr[0], keyValueArr[1]];
      if (key !== 'tags') {
        obj[key] = value.trim();
      }
      return obj;
    }, {});
    let allTags = Array.from(tagsElement.options).map(option => option.value);
    let numberOfTags = allTags.length;
    if (numberOfTags === 1) {
      data.tags = null;
    } else {
      data.tags = allTags.slice(1, numberOfTags).join(',');
    }
    return JSON.stringify(data);
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