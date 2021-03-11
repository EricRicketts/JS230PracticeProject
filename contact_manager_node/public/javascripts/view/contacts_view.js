let ContactsView = {
  addNewTagToTags(currentTagsSelectElement, newTagValue) {
    let newOption = new Option(newTagValue, newTagValue, false, false);
    newOption.disabled = true;
    currentTagsSelectElement.appendChild(newOption);
  },
  errorMessage: function(inputElement, errorStr) {
    let errorParagraph = inputElement.nextElementSibling;
    this.removeAllChildren(errorParagraph);
    let errorText = this.document.createTextNode(errorStr);
    errorParagraph.appendChild(errorText);
    errorParagraph.classList.remove('hidden');
    errorParagraph.classList.add('error_text');
    inputElement.classList.add('error_field');
  },
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
  makeAvailableTagsNotSelectable: function(availableTagsSelect) {
    let availableTagsSelectBtn = availableTagsSelect.parentElement.nextElementSibling.querySelector('button');
    availableTagsSelect.classList.add('non_selectable');
    availableTagsSelectBtn.classList.add('non_selectable');
  },
  removeAllChildren: function(node) {
    while (node.firstChild) { node.removeChild(node.lastChild); }
  },
  removeErrorMessage(inputElement) {
    let nextElement = inputElement.nextElementSibling;
    if (nextElement && nextElement.tagName === 'P') {
      this.removeAllChildren(nextElement);
      nextElement.classList.remove('error_text');
      inputElement.classList.remove('error_field');
    }
  },
  removeMainHeaderAndMainContent: function() {
    this.removeAllChildren(this.mainHeader);
    this.removeAllChildren(this.mainContent);
  },
  replacer: function(match) {
    return match[1].toUpperCase();
  },
  showAddContactFormAndHeader: function(headerData, tagData, submitButtonDataType) {
    this.removeMainHeaderAndMainContent();
    tagData[Object.keys(submitButtonDataType)[0]] = Object.values(submitButtonDataType)[0];
    this.mainHeader.insertAdjacentHTML('afterbegin', this.showFormHeaderTemplate(headerData));
    this.mainContent.insertAdjacentHTML("afterbegin", this.editAddContactFormTemplate(tagData));
  },
  showAllContactsAndHeader: function(contacts) {
    this.removeMainHeaderAndMainContent();
    this.insertContactsHeader();
    this.mainContent.insertAdjacentHTML('afterbegin', this.allContactsTemplate(contacts));
  },
  showEditContactFormAndHeader: function(headerData, tagData, submitButtonDataType) {
    this.removeMainHeaderAndMainContent();
    tagData[Object.keys(submitButtonDataType)[0]] = Object.values(submitButtonDataType)[0];
    this.mainHeader.insertAdjacentHTML('afterbegin', this.showFormHeaderTemplate(headerData));
    this.mainContent.insertAdjacentHTML('afterbegin', this.editAddContactFormTemplate(tagData));
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
  transferATagFromAvailableTagsToCurrentTags: function(availableTagsSelect, currentTagsSelect) {
    let selectedTagIndex = availableTagsSelect.selectedIndex;
    let selectedTag = availableTagsSelect.options[selectedTagIndex];
    let clonedSelectedTag = selectedTag.cloneNode(true);
    clonedSelectedTag.disabled = true;
    currentTagsSelect.appendChild(clonedSelectedTag);
    availableTagsSelect.removeChild(availableTagsSelect.options[selectedTagIndex]);
    if (this.app.helpers.areThereNoAvailableTags(availableTagsSelect)) {
      this.makeAvailableTagsNotSelectable(availableTagsSelect);
    }
  },
  init: function(document, contactApp) {
    this.document = document;
    this.app = contactApp;
    this.re = /_[a-z]/g;
    this.initializeAndRegisterPartials();
    this.initializeAndCompileTemplates();
    this.storeMainHeaderAndContentElement();
    return this;
  }
}

export { ContactsView };