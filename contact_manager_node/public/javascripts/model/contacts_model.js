let ContactsModel = {
  addNewTag: function(contactObject, newTag) {
    let tagTaken = contactObject.tags.includes(newTag) || contactObject.available_tags.includes(newTag);
    return tagTaken ? false : contactObject.tags.push(newTag);
  },
  contactHasTag: function(contactObject, searchTag) {
    return contactObject.tags.includes(searchTag);
  },
  deepCopyServerData: function(data) {
    return JSON.parse(JSON.stringify(data));
  },
  extractAvailableTags: function(contactObject) {
    let contactTags = contactObject.tags;
    if (!contactTags) {
      return this.allUniqueTags;
    } else {
      return this.allUniqueTags.reduce((availableTags, globalTag) => {
        if (!contactTags.includes(globalTag)) { availableTags.push(globalTag); }
        return availableTags;
      }, []).sort();
    }
  },
  findContactsWithTag: function(searchTag) {
    return this.allContacts.filter(contactObject => this.contactHasTag(contactObject, searchTag));
  },
  formatAddContactSubmitButton: function() {
    return { submit_type: this.addContactButtonDataType };
  },
  formatEditContactSubmitButton: function() {
    return { submit_type: this.editContactButtonDataType };
  },
  formattedAddContactHeader: function() {
    return { header_title: this.addContactHeader };
  },
  formattedAllContactData: function() {
    return { contacts: this.allContacts };
  },
  formattedEditContactHeader: function() {
    return { header_title: this.editContactHeader };
  },
  formattedTagsForAddContact: function() {
    let availableTags = this.deepCopyServerData(this.allUniqueTags);
    return { tags: [], available_tags: availableTags }
  },
  formattedTagsForEditContact: function(contactObject) {
    return { tags: contactObject.tags, available_tags: this.extractAvailableTags(contactObject) };
  },
  noSearchResults: function(searchString) {
    return `There are no contacts with the letters \'${searchString}\'`;
  },
  formContactObject: function(serverContactData) {
    let contactObject = this.deepCopyServerData(serverContactData);
    if (contactObject.tags !== null) {
      contactObject.tags = contactObject.tags.split(',').sort();
    }
    return contactObject;
  },
  search: function(searchString) {
    let searchResults = this.allContacts.filter(contact => contact.full_name.includes(searchString));
    return { contacts: searchResults };
  },
  storeAllContactData(serverContactData) {
    let formattedContactData = this.deepCopyServerData(serverContactData).map(contact => {
      contact.tags = contact.tags ? this.tagStringToArray(contact) : [];
      return contact;
    });
    this.allContacts = formattedContactData;
  },
  storeAllUniqueTagData(serverData) {
    let allTags = this.deepCopyServerData(serverData).map(contact => {
      return contact.tags && this.tagStringToArray(contact)
    }).flat();
    this.allUniqueTags = allTags.reduce((allUniqueTags, tag) => {
      if (tag && !allUniqueTags.includes(tag)) { allUniqueTags.push(tag); }
      return allUniqueTags;
    }, []).sort();
  },
  tagIsDuplicate(tagValue) {
    return this.allUniqueTags.includes(tagValue);
  },
  tagStringToArray: function(contactObject) {
    return contactObject.tags.split(',').map(tag => tag.trim()).sort();
  },
  transferAvailableTagToContact: function(contactObject, availableTag) {
    let indexOfAvailableTag = contactObject.available_tags.indexOf(availableTag);
    contactObject.tags.push(contactObject.available_tags.splice(indexOfAvailableTag, 1)[0]);
  },
  init: function() {
    this.addContactHeader = 'Create Contact';
    this.editContactHeader = 'Edit Contact';
    this.noContactsHeader = 'There are no contacts';
    this.addContactButtonDataType = 'add_contact';
    this.editContactButtonDataType = 'edit_contact';
    this.allContacts = null;
    this.allUniqueTags = null;
    return this;
  }
}

export { ContactsModel };