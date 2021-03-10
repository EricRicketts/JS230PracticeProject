let EditContactController = {
  buildAndSendRequest: function(form) {
    let editContactXhr = this.formSingleContactPutRequest();
    let jsonData = this.app.helpers.convertDataToJson(this.form);
    editContactXhr.send(jsonData);
    editContactXhr.addEventListener('load', event => {
      let response = event.target.response;
      this.app.getAllContactsController.getAllContacts();
    });
  },
  editContactForm: function(targetElement) {
    let getSingleContactXhr = this.formSingleContactGetRequest(targetElement);
    getSingleContactXhr.send();
    this.populateEditFormWithXhrData(getSingleContactXhr);
  },
  formatHeaderAndTagDataForTemplate: function(contactData) {
    let headerData = this.app.model.formattedEditContactHeader();
    let contactObject = this.app.model.formContactObject(contactData);
    let tagData = this.app.model.formattedTagsForEditContact(contactObject);
    return [headerData, tagData];
  },
  formSingleContactGetRequest: function(targetElement) {
    this.contactId = targetElement.dataset.id;
    let fullUrl = this.url + `/${this.contactId}`;
    let xhr = new XMLHttpRequest();
    xhr.open(this.get_method, fullUrl);
    xhr.responseType = 'json';
    return xhr;
  },
  formSingleContactPutRequest: function() {
    let fullUrl = this.url + `/${this.contactId}`;
    let xhr = new XMLHttpRequest();
    xhr.open(this.put_method, fullUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    return xhr;
  },
  populateEditFormWithXhrData: function(xhr) {
    xhr.addEventListener('load', event => {
      this.populateEditFormHeaderAndTagFields(event);
      this.form = this.app.document.getElementById('edit_add_contact_form');
      let contactObject = this.app.model.formContactObject(event.target.response);
      this.populateRestOfEditForm(contactObject, this.form);
      this.app.helpers.addFocusListeners(this.form);
    });
  },
  populateEditFormHeaderAndTagFields: function(event) {
    let [headerData, tagData] = this.formatHeaderAndTagDataForTemplate(event.target.response);
    let submitButtonDataType = this.app.model.formatEditContactSubmitButton();
    this.app.view.showEditContactFormAndHeader(headerData, tagData, submitButtonDataType);
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
  submitEditContactForm: function() {
    if (this.verifyAllInputs(this.form)) { this.buildAndSendRequest(this.form); }
  },
  verifyAllInputs: function(form) {
    return this.app.formErrorController.verifyAllInputs(form);
  },
  init: function(contactApp) {
    this.app = contactApp;
    this.url = 'http://localhost:3000/api/contacts';
    this.get_method = 'GET';
    this.put_method = 'PUT';
    return this;
  }
}

export { EditContactController };