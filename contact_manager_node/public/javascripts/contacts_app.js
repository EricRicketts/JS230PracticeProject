import { ContactsView } from "./view/contacts_view.js";
import { ContactsModel } from "./model/contacts_model.js";
import { GetAllContactsController } from './controllers/get_all_contacts_contoller.js';
import { DeleteContactController } from "./controllers/delete_contact_controller.js";
import { AddContactController } from "./controllers/add_contact_controller.js";

let ContactsApp = {
  deployControllers: function() {
    this.document.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      let targetElement = event.target;
      if (this.isDeleteContact(targetElement)) {
        this.deleteContactController.deleteContact(targetElement);
      } else if (this.isAddContact(targetElement)) {
        this.addContactController.addContactForm(targetElement);
      }
    });
  },
  initializeControllers: function(contactApp) {
    this.getAllContactsController = GetAllContactsController.init(contactApp);
    this.deleteContactController = DeleteContactController.init(contactApp);
    this.addContactController = AddContactController.init(contactApp);
  },
  isAddContact: function(targetElement) {
    return targetElement.dataset.type === 'add';
  },
  isDeleteContact: function(targetElement) {
    return targetElement.dataset.type === 'delete';
  },
  init: function(document) {
    this.document = document;
    this.view = ContactsView.init(document);
    this.model = ContactsModel.init();
    this.initializeControllers(this);
    this.getAllContactsController.getAllContacts();
    return this;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let contactsApp = ContactsApp.init(document);
  contactsApp.deployControllers();
});