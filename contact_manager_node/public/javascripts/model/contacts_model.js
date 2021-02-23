let ContactsModel = {
  addNewTag: function(contactObject, newTag) {
    let tagTaken = contactObject.tags.includes(newTag) || contactObject.available_tags.includes(newTag);
    return tagTaken ? false : contactObject.tags.push(newTag);
  },
  contactHasTag: function(contactObject, searchTag) {
    return this.tagStringToArray(contactObject).includes(searchTag);
  },
  extractAvailableTags: function(contactObject) {
    return this.allUniqueTags.reduce((availableTags, globalTag) => {
      if (!this.tagStringToArray(contactObject).includes(globalTag)) { availableTags.push(globalTag); }
      return availableTags;
    }, []).sort();
  },
  findContactsWithTag: function(searchTag) {
    return this.allContacts.filter(contactObject => {
      return typeof contactObject.tags === 'string' ? this.contactHasTag(contactObject, searchTag) : false;
    });
  },
  formattedAllContactData: function() {
    return { contacts: this.allContacts };
  },
  formatTags(contactObjectTags, newTag = false) {
    if (newTag) { contactObjectTags.push(newTag) }
    return contactObjectTags.join(',');
  },
  formatTagsForEdit: function(contactObject) {
    return { tags: this.tagStringToArray(contactObject), available_tags: this.extractAvailableTags(contactObject) };
  },
  noSearchResults: function(searchString) {
    return `There are no contacts with the letters \'${searchString}\'`;
  },
  search: function(searchString) {
    let searchResults = this.allContacts.filter(contact => contact.full_name.includes(searchString));
    return { contacts: searchResults };
  },
  storeAllContactData(serverData) {
    this.allContacts = serverData;
  },
  storeAllUniqueTagData(serverData) {
    let allTags = serverData.map(contact => contact.tags && this.tagStringToArray(contact)).flat();
    this.allUniqueTags = allTags.reduce((allUniqueTags, tag) => {
      if (tag && !allUniqueTags.includes(tag)) { allUniqueTags.push(tag); }
      return allUniqueTags;
    }, []).sort();
  },
  tagStringToArray: function(contactObject) {
    return contactObject.tags.split(',').map(tag => tag.trim());
  },
  transferAvailableTagToContact: function(contactObject, availableTag) {
    let indexOfAvailableTag = contactObject.available_tags.indexOf(availableTag);
    contactObject.tags.push(contactObject.available_tags.splice(indexOfAvailableTag, 1)[0]);
  },
  init: function() {
    this.addContactHeader = 'Create Contact';
    this.editContactHeader = 'Edit Contact';
    this.noContactsHeader = 'There are no contacts';
    this.allContacts = null;
    this.allUniqueTags = null;
    return this;
  }
}

export { ContactsModel };