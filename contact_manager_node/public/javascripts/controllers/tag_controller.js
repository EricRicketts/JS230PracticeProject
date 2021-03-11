let TagController = {
  addAvailableTag: function(targetElement) {
    let form = this.app.document.getElementById('edit_add_contact_form');
    let currentTagsSelect = form.querySelector('#tags');
    let availTagsSelect = targetElement.parentElement.previousElementSibling.querySelector('#available_tags');
    let thereAreAvailableTags = !this.app.helpers.areThereNoAvailableTags(availTagsSelect);
    if (thereAreAvailableTags) {
      this.app.view.transferATagFromAvailableTagsToCurrentTags(availTagsSelect, currentTagsSelect);
    }
  },
  addNewTag: function(targetElement) {
    let form = this.app.document.getElementById('edit_add_contact_form');
    let currentTagsSelect = form.querySelector('#tags');
    let inputElement = targetElement.parentElement.previousElementSibling.querySelector('input');
    let newTagValue = `${inputElement.value.trim()}`;
    if (this.app.formErrorController.verifyNewTag(inputElement, newTagValue)) {
      inputElement.value = '';
      this.app.view.addNewTagToTags(currentTagsSelect, newTagValue);
    }
  },
  addNewTagOrAddAvailableTag(targetElement) {
    if (targetElement.dataset.type === 'addTag') {
      this.addNewTag(targetElement);
    } else if (targetElement.dataset.type === 'transferTag') {
      this.addAvailableTag(targetElement);
    }
  },
  showContactsWithCommonTag: function(targetElement) {
    let tagsSelectElement = targetElement.parentElement.previousElementSibling;
    let selectedTag = tagsSelectElement.options[tagsSelectElement.selectedIndex].value;
    let sharedContacts = this.app.model.findContactsWithTag(selectedTag);
    let formattedSharedContacts = this.app.model.formatGivenContactData(sharedContacts);
    this.app.view.showAllContactsAndHeader(formattedSharedContacts);
  },
  init: function(contactApp) {
    this.app = contactApp;
    return this;
  }
}

export { TagController };