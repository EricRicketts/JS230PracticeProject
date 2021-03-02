let AddContactController = {
  addContactForm: function(targetElement) {
    let headerData = this.app.model.formattedAddContactHeader();
    let addContactTags = this.app.model.formattedTagsForAddContact();
    this.app.view.showAddContactFormAndHeader(headerData, addContactTags);
  },
  init: function(contactApp) {
    this.app = contactApp;
    this.method = 'POST';
    this.url = 'http://localhost:3000/api/contacts';
    return this;
  }
}

export { AddContactController };