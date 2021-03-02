let DeleteContactController = {
  deleteContact: function(targetElement) {
    let deleteContactStr = 'Are you sure you want to delete the contact?';
    if (confirm(deleteContactStr)) { this.deleteContactRequest(targetElement); }
  },
  deleteContactRequest: function(targetElement) {
    let targetId = targetElement.dataset.id;
    let deleteXhr = new XMLHttpRequest();
    let entirePath = this.url + `/${targetId}`;
    deleteXhr.open(this.method, entirePath);
    deleteXhr.send();
    deleteXhr.addEventListener('load', event => {
      let response = event.target.response;
      let url = this.app.getAllContactsController.url;
      let method = this.app.getAllContactsController.method;
      this.app.getAllContactsController.getAllContacts(event, url, method);
    });
  },
  init: function(contactApp) {
    this.app = contactApp;
    this.url = 'http://localhost:3000/api/contacts';
    this.method = 'DELETE';
    return this;
  }
}

export { DeleteContactController };