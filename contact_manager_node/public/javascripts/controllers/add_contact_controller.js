let AddContactController = {
  addContactForm: function(targetElement) {
    let headerData = this.model.formattedAddContactHeader();
    let addContactTags = this.model.formattedTagsForAddContact();
    let submitButtonDataType = this.model.formatAddContactSubmitButton();
    this.view.showAddContactFormAndHeader(headerData, addContactTags, submitButtonDataType);
    this.form = this.document.getElementById('edit_add_contact_form');
    this.helpers.addFocusListeners(this.form);
  },
  buildAndSendRequest: function(form) {
    let addContactXhr = this.formSingleContactPostRequest();
    let jsonData = this.helpers.convertDataToJson(this.form);
    addContactXhr.send(jsonData);
    addContactXhr.addEventListener('load', event => {
      let response = event.target.response;
      this.getAllContactsController.getAllContacts();
    });
  },
  formSingleContactPostRequest: function() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', this.url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    return xhr;
  },
  verifyAndSubmitAddContactForm: function() {
    if (this.formErrorController.verifyAllInputs(this.form)) { this.buildAndSendRequest(this.form); }
  },
  init: function(contactApp) {
    Object.setPrototypeOf(this, contactApp);
    this.url = 'http://localhost:3000/api/contacts';
    return this;
  }
}

export { AddContactController };