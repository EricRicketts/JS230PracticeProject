let EditContactController = {
  editContactForm: function(targetElement) {
    let getSingleContactXhr = this.formSingleContactGetRequest(targetElement);
    getSingleContactXhr.send();
    this.getSingleContactInformation(getSingleContactXhr);
  },
  formSingleContactGetRequest: function(targetElement) {
    let contactId = targetElement.dataset.id;
    let fullUrl = this.url + `/${contactId}`;
    let xhr = new XMLHttpRequest();
    xhr.open(this.get_method, fullUrl);
    xhr.responseType = 'json';
    return xhr;
  },
  getSingleContactInformation: function(xhr) {
    xhr.addEventListener('load', event => {
      let headerData = this.app.model.formattedEditContactHeader();
      let contactData = event.target.response;
      let contactObject = this.app.model.formContactObject(contactData);
      let contactKeys = Object.keys(contactObject).filter(key => key !== 'tags');
      let tagData = this.app.model.formattedTagsForEditContact(contactObject);
      this.app.view.showEditContactFormAndHeader(headerData, tagData);
      let form = this.app.document.getElementById('edit_add_contact_form');
      let personalFormInputs = Array.from(form.getElementsByTagName('input')).filter(input => {
        return input.id !== 'new_tag';
      });
      personalFormInputs.forEach(input => {
        let contactKey = contactKeys.find(key => key === input.id);
        input.value = contactObject[contactKey];
      });
      form = this.app.document.getElementById('edit_add_contact_form');
      this.app.helpers.addFocusListeners(form);
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