let GetAllContactsController = {
  getAllContacts: function(event=undefined, url=this.url, method=this.method) {
    this.getAllContactsRequest(event, url, method).addEventListener('load', event => {
      this.updateModelAndView(event);
    });
  },
  getAllContactsRequest: function(event, url, method) {
    event && event.preventDefault();
    let getAllContactsXhr = new XMLHttpRequest();
    getAllContactsXhr.open(method, url);
    getAllContactsXhr.responseType = 'json';
    getAllContactsXhr.send();
    return getAllContactsXhr;
  },
  showHomePageView: function() {
    let contacts = this.app.model.formattedAllContactData();
    let contactsExist = this.app.model.allContacts && this.app.model.allContacts.length > 0;
    contactsExist ? this.app.view.showAllContactsAndHeader(contacts) : this.app.view.showNoContactsAndHeader();
  },
  updateModelContactsAndTagsCache: function(contactsArray) {
    this.app.model.storeAllContactData(contactsArray);
    this.app.model.storeAllUniqueTagData(contactsArray);
  },
  updateModelAndView: function(event) {
    let contactsArray = event.target.response;
    this.updateModelContactsAndTagsCache(contactsArray);
    this.showHomePageView();
  },
  init: function(contactsApp) {
    this.app = contactsApp;
    this.url = 'http://localhost:3000/api/contacts';
    this.method = 'GET';
    return this;
  }
}

export { GetAllContactsController };