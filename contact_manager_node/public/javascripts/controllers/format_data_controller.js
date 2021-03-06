let FormatDataController = {
  convertDataToJson: function(formData) {
    let data = Array.from(formData.entries()).reduce((obj, keyValueArr) => {
      let [key, value] = [keyValueArr[0], keyValueArr[1]];
      if (this.contactAttributes.includes(key)) {
        obj[key] = value.trim();
      }
      if (key === 'tags' && value.length === 0) { obj[key] = null; }
      return obj;
    }, {});
    return JSON.stringify(data);
  },
  init: function(contactApp) {
    this.app = contactApp;
    this.contactAttributes = ['full_name', 'phone_number', 'email', 'tags'];
    return this;
  }
}

export { FormatDataController };