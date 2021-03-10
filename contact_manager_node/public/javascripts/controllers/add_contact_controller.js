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
    let addContactXhr = new XMLHttpRequest();
    addContactXhr.open(this.method, this.url);
    addContactXhr.setRequestHeader('Content-Type', 'application/json');
    addContactXhr.responseType = 'json';
    let jsonData = this.app.helpers.convertDataToJson(this.form);
    addContactXhr.send(jsonData);
    addContactXhr.addEventListener('load', event => {
      let response = event.target.response;
      this.app.getAllContactsController.getAllContacts();
    });
  },
  submitAddContactForm: function() {
    if (this.verifyAllInputs(this.form)) { this.buildAndSendRequest(this.form); }
  },
  verifyAllInputs: function(form) {
    return this.app.formErrorController.verifyAllInputs(form);
  },
  init: function(contactApp) {
    this.app = contactApp;
    this.method = 'POST';
    this.url = 'http://localhost:3000/api/contacts';
    return this;
  }
}

export { AddContactController };