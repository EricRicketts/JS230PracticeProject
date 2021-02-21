let ContactsModel = {
  formattedAllContactData: function() {
    return { contacts: this.allContacts };
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
    this.allUniqueTags = [];
    const re = /\s*,\s*/;
    let allTags = serverData.map(contact => contact.tags && contact.tags.split(re)).flat();
    allTags.forEach(tag => {
      if (tag && !this.allUniqueTags.includes(tag)) { this.allUniqueTags.push(tag) }
    });
    this.allUniqueTags.sort();
  },
  init: function() {
    this.addContactHeader = 'Create Contact';
    this.editContactHeader = 'Edit Contact';
    this.noContactsHeader = 'There are not contacts';
    this.allContacts = null;
    this.allUniqueTags = null;
    return this;
  }
}

export { ContactsModel };