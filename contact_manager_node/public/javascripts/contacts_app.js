import { ContactsView } from "./view/contacts_view.js";
import { ContactsModel } from "./model/contacts_model.js";
import { GetAllContactsController } from './controllers/get_all_contacts_contoller.js';
import { DeleteContactController } from "./controllers/delete_contact_controller.js";
import { AddContactController } from "./controllers/add_contact_controller.js";
import { EditContactController } from "./controllers/edit_contact_controller.js";
import { FormErrorController } from "./controllers/form_error_controller.js";
import { TagController } from "./controllers/tag_controller.js";
import { Helpers } from './helpers/helpers.js';

let ContactsApp = {
  deployControllers: function() {
    this.document.addEventListener('click', event => {
      let targetElement = event.target;
      if (this.isDeleteContact(targetElement)) {
        this.deleteContactController.deleteContact(targetElement);
      } else if (this.isLinkToAddContactForm(targetElement)) {
        this.addContactController.addContactForm(targetElement);
      } else if (this.isSubmitAddContactForm(targetElement)) {
        this.addContactController.verifyAndSubmitAddContactForm();
      } else if (this.isLinkToEditContactForm(targetElement)) {
        this.editContactController.editContactForm(targetElement);
      } else if (this.isSubmitEditContactForm(targetElement)) {
        this.editContactController.verifyAndSubmitEditContactForm();
      } else if (this.isAddNewTagOrAddAvailableTag(targetElement)) {
        this.tagController.addNewTagOrAddAvailableTag(targetElement);
      } else if (this.isShowContactsWithCommonTag(targetElement)) {
        this.tagController.showContactsWithCommonTag(targetElement);
      } else if (this.isCancelButtonOrHeaderLink(targetElement)) {
        this.getAllContactsController.getAllContacts();
      }
    });
  },
  initializeControllers: function(contactApp) {
    this.getAllContactsController = GetAllContactsController.init(contactApp);
    this.deleteContactController = DeleteContactController.init(contactApp);
    this.addContactController = AddContactController.init(contactApp);
    this.editContactController = EditContactController.init(contactApp);
    this.formErrorController = FormErrorController.init(contactApp);
    this.tagController = TagController.init(contactApp);
    this.helpers = Helpers.init(contactApp);
  },
  isAddNewTagOrAddAvailableTag(targetElement) {
    return targetElement.dataset.type === 'transferTag' || targetElement.dataset.type === 'addTag';
  },
  isCancelButtonOrHeaderLink: function(targetElement) {
    return targetElement.dataset.type === 'get_all_contacts';
  },
  isDeleteContact: function(targetElement) {
    return targetElement.dataset.type === 'delete';
  },
  isLinkToAddContactForm: function(targetElement) {
    return targetElement.dataset.type === 'add';
  },
  isShowContactsWithCommonTag(targetElement) {
    return targetElement.dataset.type === 'shared_contacts';
  },
  isSubmitAddContactForm: function(targetElement) {
    return targetElement.dataset.type === 'add_contact';
  },
  isSubmitEditContactForm: function(targetElement) {
    return targetElement.dataset.type === 'edit_contact';
  },
  isLinkToEditContactForm: function(targetElement) {
    return targetElement.dataset.type === 'edit';
  },
  init: function(document) {
    this.document = document;
    this.view = ContactsView.init(document, this);
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
