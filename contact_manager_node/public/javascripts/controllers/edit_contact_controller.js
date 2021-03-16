let EditContactController = {
  buildAndSendRequest: function(form) {
    let editContactXhr = this.formSingleContactPutRequest();
    let jsonData = this.helpers.convertDataToJson(this.form);
    editContactXhr.send(jsonData);
    editContactXhr.addEventListener('load', event => {
      let response = event.target.response;
      this.getAllContactsController.getAllContacts();
    });
  },
  editContactForm: function(targetElement) {
    let getSingleContactXhr = this.formSingleContactGetRequest(targetElement);
    getSingleContactXhr.send();
    this.populateEditFormWithXhrData(getSingleContactXhr);
  },
  formatHeaderAndTagDataForTemplate: function(contactData) {
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
      this.form = this.document.getElementById('edit_add_contact_form');
      let contactObject = this.model.formContactObject(contactData);
      this.populateRestOfEditForm(contactObject, this.form);
      this.helpers.addFocusListeners(this.form);
    });
  },
  populateEditFormHeaderAndTagFields: function(contactData) {
    let [headerData, tagData] = this.formatHeaderAndTagDataForTemplate(contactData);
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
    if (this.formErrorController.verifyAllInputs(this.form)) { this.buildAndSendRequest(this.form); }
  },
  init: function(contactApp) {
    Object.setPrototypeOf(this, contactApp);
    this.url = 'http://localhost:3000/api/contacts';
    return this;
  }
}

export { EditContactController };