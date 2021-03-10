let EditContactController = {
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
    let contactId = targetElement.dataset.id;
    let fullUrl = this.url + `/${contactId}`;
    let xhr = new XMLHttpRequest();
    xhr.open(this.get_method, fullUrl);
    xhr.responseType = 'json';
    return xhr;
  },
  populateEditFormWithXhrData: function(xhr) {
    xhr.addEventListener('load', event => {
      this.populateEditFormHeaderAndTagFields(event);
      let form = this.app.document.getElementById('edit_add_contact_form');
      let contactObject = this.app.model.formContactObject(event.target.response);
      this.populateRestOfEditForm(contactObject, form);
      this.app.helpers.addFocusListeners(form);
    });
  },
  populateEditFormHeaderAndTagFields: function(event) {
    let [headerData, tagData] = this.formatHeaderAndTagDataForTemplate(event.target.response);
    this.app.view.showEditContactFormAndHeader(headerData, tagData);
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
  init: function(contactApp) {
    this.app = contactApp;
    this.url = 'http://localhost:3000/api/contacts';
    this.get_method = 'GET';
    this.put_method = 'PUT';
    return this;
  }
}

export { EditContactController };