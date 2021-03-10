let AddContactController = {
  addContactForm: function(targetElement) {
    let headerData = this.app.model.formattedAddContactHeader();
    let addContactTags = this.app.model.formattedTagsForAddContact();
    let submitButtonDataType = this.app.model.formatAddContactSubmitButton();
    this.app.view.showAddContactFormAndHeader(headerData, addContactTags, submitButtonDataType);
    this.form = this.app.document.getElementById('edit_add_contact_form');
    this.app.helpers.addFocusListeners(this.form);
  },
  buildAndSendRequest: function(form) {
    let addContactXhr = this.formSingleContactPostRequest();
    let jsonData = this.app.helpers.convertDataToJson(this.form);
    addContactXhr.send(jsonData);
    addContactXhr.addEventListener('load', event => {
      let response = event.target.response;
      this.app.getAllContactsController.getAllContacts();
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
    if (this.app.formErrorController.verifyAllInputs(this.form)) { this.buildAndSendRequest(this.form); }
  },
  init: function(contactApp) {
    this.app = contactApp;
    this.url = 'http://localhost:3000/api/contacts';
    return this;
  }
}

export { AddContactController };