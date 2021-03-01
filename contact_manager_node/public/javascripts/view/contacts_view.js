let ContactsView = {
  initializeAndCompileTemplates: function() {
    let allTemplates = Array.from(this.document.querySelectorAll('[data-group=template]'));
    allTemplates.forEach(template => {
      let propertyName = template.id.replace(this.re, this.replacer);
      Object.defineProperty(this, propertyName, {
        value: Handlebars.compile(template.innerHTML),
        writable: true,
        configurable: true,
        enumerable: true
      })
    })
  },
  initializeAndRegisterPartials: function() {
    let allPartials = Array.from(this.document.querySelectorAll('[data-group=partial]'));
    allPartials.forEach(partial => {
      let partialName = partial.id.replace(this.re, this.replacer);
      Handlebars.registerPartial(partialName, partial.innerHTML);
    });
  },
  insertContactsHeader: function() {
    this.mainHeader.insertAdjacentHTML('afterbegin', this.showContactsHeaderTemplate());
  },
  removeAllChildren: function(node) {
    while (node.firstChild) { node.removeChild(node.lastChild); }
  },
  removeMainHeaderAndMainContent: function() {
    this.removeAllChildren(this.mainHeader);
    this.removeAllChildren(this.mainContent);
  },
  replacer: function(match) {
    return match[1].toUpperCase();
  },
  showAllContactsAndHeader: function(dataFromModel) {
    this.removeMainHeaderAndMainContent();
    this.insertContactsHeader();
    this.mainContent.insertAdjacentHTML('afterbegin', this.allContactsTemplate(dataFromModel));
  },
  showNoContactsAndHeader: function() {
    this.removeMainHeaderAndMainContent();
    this.insertContactsHeader();
    this.mainContent.insertAdjacentHTML('afterbegin', this.noContactsTemplate());
  },
  storeMainHeaderAndContentElement: function() {
    this.mainHeader = this.document.getElementById('content_heading');
    this.mainContent = this.document.getElementById('content');
  },
  init: function(document) {
    this.document = document;
    this.re = /_[a-z]/g;
    this.initializeAndRegisterPartials();
    this.initializeAndCompileTemplates();
    this.storeMainHeaderAndContentElement();
    return this;
  }
}

export { ContactsView };