let EditContactController = {
  editContactForm: function(targetElement) {
    let contactId = targetElement.dataset.id;
    let fullUrl = this.url + `/${contactId}`;
    let headerData = this.app.model.formattedEditContactHeader();
    let getSingleContactXhr = new XMLHttpRequest();
    getSingleContactXhr.open(this.get_method, fullUrl);
    getSingleContactXhr.responseType = 'json';
    getSingleContactXhr.send();
    getSingleContactXhr.addEventListener('load', event => {
      let contactData = event.target.response;
      let contactObject = this.app.model.formContactObject(contactData);
      let tagData = this.app.model.formattedTagsForEditContact(contactObject);
      this.app.view.showEditContactFormAndHeader(headerData, tagData);
    });
  },
  getSingleContactInformation: function(targetElement) {

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