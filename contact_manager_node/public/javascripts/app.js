let App = {
  registerAllPartials: function() {
    Handlebars.registerPartial('show_no_contacts', this.showNoContactsPartial.innerHTML);
    Handlebars.registerPartial('show_all_contacts', this.showAllContactsPartial.innerHTML);
  },
  showContactInformation: function() {
    const path = '/api/contacts';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.domain + path);
    xhr.responseType = 'json';
    xhr.send();

    xhr.addEventListener('load', event => {
      let data = { contacts: event.target.response };
      this.contactsOrFormsDiv.insertAdjacentHTML('afterbegin', this.contactsDisplayTemplate(data));
    });
  },
  init: function(document) {
    this.document = document;
    this.domain = 'http://localhost:3000';
    this.showAllContactsPartial = this.document.getElementById('show_all_contacts_partial');
    this.showNoContactsPartial = this.document.getElementById('show_no_contacts_partial');
    this.contactsDisplay = this.document.getElementById('contacts_display');
    this.contactsDisplayTemplate = Handlebars.compile(this.contactsDisplay.innerHTML);
    this.contactsOrFormsDiv = this.document.getElementById('contacts_or_forms');
    this.registerAllPartials();
    this.showContactInformation();
  }
}
document.addEventListener('DOMContentLoaded', function() {
  App.init(document);
});