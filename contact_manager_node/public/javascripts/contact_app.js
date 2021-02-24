import { ContactsView } from "./view/contacts_view.js";
import { ContactsModel } from "./model/contacts_model.js";

let ContactApp = {
  init: function(document) {
    this.view = ContactsView.init(document);
    this.model = ContactsModel.init();
    return this;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let contactApp = ContactApp.init(document);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/api/contacts');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', event => {
    let response = event.target.response;
    contactApp.model.storeAllContactData(response);
    contactApp.view.showExistingContactsAndHeader(contactApp.model.formattedAllContactData())
  })
});