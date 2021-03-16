let SearchController = {
  searchForContacts: function(event) {
    if (event.key) {
      let searchString = event.target.value;
      console.log(`Search String: ${event.target.value}`);
      let searchResults = this.model.search(event.target.value);
      if (searchResults.contacts.length === 0) {
        let noSearchResults = { header: `No results from search for ${searchString}` };
        this.view.showNoSearchResults(noSearchResults);
      } else {
        this.view.showSearchResults(searchResults);
      }
    }
  },
  init: function(contactApp) {
    Object.setPrototypeOf(this, contactApp);
    return this;
  }
}

export { SearchController };