let EditContactController = {
  buildAndSendRequest: function(form) {
    let editContactXhr = this.formSingleContactPutRequest();
    // let jsonData = this.app.helpers.convertDataToJson(this.form);
    let jsonData = this.helpers.convertDataToJson(this.form);
    editContactXhr.send(jsonData);
    editContactXhr.addEventListener('load', event => {
      let response = event.target.response;
      // this.app.getAllContactsController.getAllContacts();
      this.getAllContactsController.getAllContacts();
    });
  },
  editContactForm: function(targetElement) {
    let getSingleContactXhr = this.formSingleContactGetRequest(targetElement);
    getSingleContactXhr.send();
    this.populateEditFormWithXhrData(getSingleContactXhr);
  },
  formatHeaderAndTagDataForTemplate: function(contactData) {
    // let headerData = this.app.model.formattedEditContactHeader();
    // let contactObject = this.app.model.formContactObject(contactData);
    // let tagData = this.app.model.formattedTagsForEditContact(contactObject);
    let headerData = this.model.formattedEditContactHeader();
    let contactObject = this.model.formContactObject(contactData);
    let tagData = this.model.formattedTagsForEditContact(contactObject);
    return [headerData, tagData];
  },
  formSingleContactGetRequest: function(targetElement) {
    this.contactId = targetElement.dataset.id;
    let fullUrl = this.url + `/${this.contactId}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', fullUrl);
    xhr.responseType = 'json';
    return xhr;
  },
  formSingleContactPutRequest: function() {
    let fullUrl = this.url + `/${this.contactId}`;
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', fullUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    return xhr;
  },
  populateEditFormWithXhrData: function(xhr) {
    xhr.addEventListener('load', event => {
      let contactData = event.target.response;
      this.populateEditFormHeaderAndTagFields(contactData);
      // this.form = this.app.document.getElementById('edit_add_contact_form');
      // let contactObject = this.app.model.formContactObject(contactData);
      this.form = this.document.getElementById('edit_add_contact_form');
      let contactObject = this.model.formContactObject(contactData);
      this.populateRestOfEditForm(contactObject, this.form);
      // this.app.helpers.addFocusListeners(this.form);
      this.helpers.addFocusListeners(this.form);
    });
  },
  populateEditFormHeaderAndTagFields: function(contactData) {
    let [headerData, tagData] = this.formatHeaderAndTagDataForTemplate(contactData);
    // let submitButtonDataType = this.app.model.formatEditContactSubmitButton();
    // this.app.view.showEditContactFormAndHeader(headerData, tagData, submitButtonDataType);
    let submitButtonDataType = this.model.formatEditContactSubmitButton();
    this.view.showEditContactFormAndHeader(headerData, tagData, submitButtonDataType);
  },
  populateRestOfEditForm: function(contactObject, form) {
    let contactKeys = Object.keys(contactObject).filter(key => key !== 'tags');
    let personalFormInputs = Array.from(form.getElementsByTagName('input')).filter(input => {
      return input.id !== 'new_tag';
    });
    personalFormInputs.forEach(input => {
      let contactKey = contactKeys.find(key => key === input.id);
      input.value = contactObject[contactKey];
    });
  },
  verifyAndSubmitEditContactForm: function() {
    // if (this.app.formErrorController.verifyAllInputs(this.form)) { this.buildAndSendRequest(this.form); }
    if (this.formErrorController.verifyAllInputs(this.form)) { this.buildAndSendRequest(this.form); }
  },
  init: function(contactApp) {
    // this.app = contactApp;
    Object.setPrototypeOf(this, contactApp);
    this.url = 'http://localhost:3000/api/contacts';
    return this;
  }
}

export { EditContactController };