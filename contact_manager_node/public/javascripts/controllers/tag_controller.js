let TagController = {
  addAvailableTag: function(targetElement) {
    let form = this.document.getElementById('edit_add_contact_form');
    let currentTagsSelect = form.querySelector('#tags');
    let availTagsSelect = targetElement.parentElement.previousElementSibling.querySelector('#available_tags');
    let thereAreAvailableTags = !this.helpers.areThereNoAvailableTags(availTagsSelect);
    if (thereAreAvailableTags) {
      this.view.transferATagFromAvailableTagsToCurrentTags(availTagsSelect, currentTagsSelect);
    }
  },
  addNewTag: function(targetElement) {
    let form = this.document.getElementById('edit_add_contact_form');
    let currentTagsSelect = form.querySelector('#tags');
    let inputElement = targetElement.parentElement.previousElementSibling.querySelector('input');
    let newTagValue = `${inputElement.value.trim()}`;
    if (this.formErrorController.verifyNewTag(inputElement, newTagValue)) {
      inputElement.value = '';
      this.view.addNewTagToTags(currentTagsSelect, newTagValue);
    }
  },
  addNewTagOrAddAvailableTag(targetElement) {
    if (targetElement.dataset.type === 'addNewTag') {
      this.addNewTag(targetElement);
    } else if (targetElement.dataset.type === 'transferTag') {
      this.addAvailableTag(targetElement);
    }
  },
  showContactsWithCommonTag: function(targetElement) {
    let tagsSelectElement = targetElement.parentElement.previousElementSibling;
    let selectedTag = tagsSelectElement.options[tagsSelectElement.selectedIndex].value;
    let sharedContacts = this.model.findContactsWithTag(selectedTag);
    let formattedSharedContacts = this.model.formatGivenContactData(sharedContacts);
    this.view.showAllContactsAndHeader(formattedSharedContacts);
  },
  init: function(contactApp) {
    Object.setPrototypeOf(this, contactApp);
    return this;
  }
}

export { TagController };