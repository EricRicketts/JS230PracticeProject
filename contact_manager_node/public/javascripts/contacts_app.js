import { ContactsView } from "./view/contacts_view.js";
import { ContactsModel } from "./model/contacts_model.js";
import { GetAllContactsController } from './controllers/get_all_contacts_contoller.js';

let ContactsApp = {
  initializeControllers: function(contactApp) {
    this.getAllContactsController = GetAllContactsController.init(contactApp);
  },
  init: function(document) {
    this.document = document;
    this.view = ContactsView.init(document);
    this.model = ContactsModel.init();
    this.initializeControllers(this);
    this.getAllContactsController.getAllContacts();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let contactsApp = ContactsApp.init(document);
});