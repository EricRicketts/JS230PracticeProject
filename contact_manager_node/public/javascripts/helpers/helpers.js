const contactAttributes = ['full_name', 'phone_number', 'email', 'tags'];
let Helpers = {
  addFocusListeners: function(form) {
    let desiredContactAttributes = contactAttributes.slice(0, 3);
    let desiredFormInputs = Array.from(form.getElementsByTagName('input')).filter(input => {
      return desiredContactAttributes.includes(input.name);
    });
    desiredFormInputs.forEach(input => {
      input.addEventListener('focus', event => {
        this.app.view.removeErrorMessage(event.target);
      });
    });
  },
  convertDataToJson: function(formData) {
    let data = Array.from(formData.entries()).reduce((obj, keyValueArr) => {
      let [key, value] = [keyValueArr[0], keyValueArr[1]];
      if (contactAttributes.includes(key)) {
        obj[key] = value.trim();
      }
      return obj;
    }, {});
    let dataHasNoTags = !Object.keys(data).includes('tags');
    if (dataHasNoTags) { data['tags'] = null; }
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