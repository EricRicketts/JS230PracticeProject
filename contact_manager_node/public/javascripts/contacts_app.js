import { ContactsView } from "./view/contacts_view.js";
import { ContactsModel } from "./model/contacts_model.js";
import { GetAllContactsController } from './controllers/get_all_contacts_contoller.js';
import { DeleteContactController } from "./controllers/delete_contact_controller.js";
import { AddContactController } from "./controllers/add_contact_controller.js";
import { EditContactController } from "./controllers/edit_contact_controller.js";
import { FormErrorController } from "./controllers/form_error_controller.js";
import { TagController } from "./controllers/tag_controller.js";
import { SearchController } from "./controllers/search_controller.js";
import { Helpers } from './helpers/helpers.js';

let ContactsApp = {
  deployControllers: function() {
    let controllerActions = {
      addContactForm: function(confirmAction) {
        return this.addContactController.addContactForm(confirmAction);
      }.bind(this),
      addContact: function(confirmAction) {
        return this.addContactController.verifyAndSubmitAddContactForm();
      }.bind(this),
      deleteContact: function(confirmAction) {
        return this.deleteContactController.deleteContact(confirmAction);
      }.bind(this),
      editContactForm: function(confirmAction) {
        return this.editContactController.editContactForm(confirmAction);
      }.bind(this),
      editContact: function(confirmAction) {
        return this.editContactController.verifyAndSubmitEditContactForm(confirmAction);
      }.bind(this),
      getAllContacts: function(confirmAction) {
        return this.getAllContactsController.getAllContacts(confirmAction);
      }.bind(this),
      addNewTag: function(confirmAction) {
        return this.tagController.addNewTagOrAddAvailableTag(confirmAction);
      }.bind(this),
      transferTag: function(confirmAction) {
        return this.tagController.addNewTagOrAddAvailableTag(confirmAction);
      }.bind(this),
      sharedContacts: function(confirmAction) {
        return this.tagController.showContactsWithCommonTag(confirmAction);
      }.bind(this),
      search: function(event) {
        return this.searchController.searchForContacts(event);
      }.bind(this)
    }
    this.document.addEventListener('click', event => {
      let confirmAction = event.target;
      let controllerAction = confirmAction.dataset.type;
      let fn = controllerActions[controllerAction];
      typeof fn === 'function' ? fn(confirmAction) : '';
    });
    this.document.addEventListener('keyup', event => {
      let confirmAction = event.target;
      let controllerAction = event.target.dataset.type;
      controllerAction === 'search' ? controllerActions[controllerAction](event) : '';
    });
  },
  initializeControllers: function(contactApp) {
    this.getAllContactsController = GetAllContactsController.init(contactApp);
    this.deleteContactController = DeleteContactController.init(contactApp);
    this.addContactController = AddContactController.init(contactApp);
    this.editContactController = EditContactController.init(contactApp);
    this.formErrorController = FormErrorController.init(contactApp);
    this.tagController = TagController.init(contactApp);
    this.searchController = SearchController.init(contactApp);
    this.helpers = Helpers.init(contactApp);
  },
  init: function(document) {
    this.document = document;
    this.view = ContactsView.init(this);
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
