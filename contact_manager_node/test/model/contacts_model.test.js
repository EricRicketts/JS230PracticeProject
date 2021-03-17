import { expect } from 'chai';
import { ContactsModel } from "../../public/javascripts/model/contacts_model";
import { ContactModelData, FormattedContactModelData } from "./contact_model_data";

describe('Contact Model', function () {
  let contacts, expected, results;
  beforeEach(() => {
    contacts = Object.create(ContactsModel).init();
  });
  describe('Header Information Initialize Contact And Tag Data', function () {
    it('should provide header information for Add Contact', function () {
      expect(contacts.formattedAddContactHeader()).to.deep.equal({ header_title: 'Create Contact' });
    });

    it('should provide header information for Edit Contact', function () {
      expect(contacts.formattedEditContactHeader()).to.deep.equal({ header_title: 'Edit Contact' });
    });

    it('should provide header information for no contacts', function () {
      expect(contacts.noContactsHeader).to.equal('There are no contacts');
    });

    it('should provide header information for no search results', function () {
      expected = 'There are no contacts with the letters \'em\'';
      expect(contacts.noSearchResults('em')).to.equal(expected);
    });

    it('should initialize all contact and tag arrays', function () {
      expected = [null, null];
      results = [contacts.allContacts, contacts.allUniqueTags];
      expect(results).to.deep.equal(expected);
    });

    it('should format add contact and edit contact submit buttons', function () {
      expected = [{ submit_type: 'addContact' }, { submit_type: 'editContact' }];
      results = [contacts.formatAddContactSubmitButton(), contacts.formatEditContactSubmitButton()];
      expect(results).to.deep.equal(expected);
    });
  });

  describe('Contact And Tag Behavior', function () {
    let serverContactData, formattedServerContactData;
    beforeEach(() => {
      serverContactData = JSON.parse(JSON.stringify(ContactModelData));
      formattedServerContactData = JSON.parse(JSON.stringify(FormattedContactModelData));
      contacts.storeAllContactData(serverContactData);
      contacts.storeAllUniqueTagData(serverContactData);
    });

    describe('Contact Behavior', function () {
      let singleContactData, singleContactDataWithNoTags;
      beforeEach(() => {
        singleContactData = {
          email: "ph@example.com",
          full_name: "Pete Hanson",
          id: 3,
          phone_number: "54321098761",
          tags: "work,programmer",
        }
        singleContactDataWithNoTags = {
          email: "foo_bar@example.com",
          full_name: "Foo Bar",
          id: 4,
          phone_number: "5432108899",
          tags: null
        }
      });

      it('should store all contact information', function () {
        expect(contacts.allContacts).to.deep.equal(formattedServerContactData);
      });
      
      it('should put the all contacts data in a format prepared for viewing', function () {
        expected = { contacts : formattedServerContactData };
        expect(contacts.formattedAllContactData()).to.deep.equal(expected);
      });

      it('should provide an object representing the search results', function () {
        expected = { contacts: [
            {
              id: 4,
              full_name: "Eric Ricketts",
              email: "eric_ricketts@icloud.com",
              phone_number: "9194495529",
              tags: []
            },
            {
              id: 5,
              full_name: "Wendy Ricketts",
              email: "wendy_ricketts@icloud.com",
              phone_number: "9194495456",
              tags: ["relative"]
            },
            {
              id: 6,
              full_name: "Marilyn Ricketts",
              email: "marilynricketts@icloud.com",
              phone_number: "7036085704",
              tags: ["relative"]
            }
          ]
        }
        expect(contacts.search('ri')).to.deep.equal(expected);
      });

      it('should provide an object representing no search results', function () {
        expected = { contacts: [] };
        expect(contacts.search('ze')).to.deep.equal(expected);
      });

      it('should build a contact object', function () {
        expected = {
          email: "ph@example.com",
          full_name: "Pete Hanson",
          id: 3,
          phone_number: "54321098761",
          tags: ['programmer', 'work'],
        }
        expect(contacts.formContactObject(singleContactData)).to.deep.equal(expected);
      });

      it('should build a contact object which has no tags', function () {
        expected = {
          email: "foo_bar@example.com",
          full_name: "Foo Bar",
          id: 4,
          phone_number: "5432108899",
          tags: null,
        }
        expect(contacts.formContactObject(singleContactDataWithNoTags)).to.deep.equal(expected);
      });
    });

    describe('Tag Behavior', function () {
      let contactObject, secondContactObject;
      beforeEach(() => {
        contactObject = {
          id: 1,
          full_name: "Naveed Fida",
          email: "nf@example.com",
          phone_number: "12345678901",
          tags: ['friend', 'work'],
          available_tags: ['programmer', 'relative', 'scientist']
        };
        secondContactObject = {
          id: 2,
          full_name: "Elmer Fudd",
          email: "elmer_fudd@warnerbros.com",
          phone_number: "4443210011",
          tags: ['friend', 'work']
        }
      });

      it('should store all of the tag information', function () {
        expected = ['friend', 'programmer', 'relative', 'scientist', 'work'];
        expect(contacts.allUniqueTags).to.deep.equal(expected);
      });

      it('should extract the available tags from the contact information', function () {
        expected = ['programmer', 'relative', 'scientist'];
        expect(contacts.extractAvailableTags(secondContactObject)).to.deep.equal(expected);
      });
      it('should return all the contacts with a given tag', function () {
        expected = [
          {
            id: 1,
            full_name: "Naveed Fida",
            email: "nf@example.com",
            phone_number: "12345678901",
            tags: ["friend", "programmer" ,"work"]
          },
          {
            id: 2,
            full_name: "Victor Reyes",
            email: "vpr@example.com",
            phone_number: "09876543210",
            tags: ["friend", "scientist", "work"]
          },
          {
            id: 3,
            full_name: "Pete Hanson",
            email: "ph@example.com",
            phone_number: "54321098761",
            tags: ["work"]
          }
        ];
        expect(contacts.findContactsWithTag('work')).to.deep.equal(expected);
      });

      it('should return an empty array if no contacts have the given tag', function () {
        expect(contacts.findContactsWithTag('foo')).to.deep.equal([]);
      });

      it('add a new tag if not in contact tags or available tags', function () {
        expected = ['friend', 'work', 'believer'];
        contacts.addNewTag(contactObject, 'believer');
        expect(contactObject.tags).to.deep.equal(expected);
      });

      it('should return false if adding a tag in contact tags', function () {
        expect(contacts.addNewTag(contactObject, 'friend')).to.equal(false);
      });

      it('should return false if adding a tag in available tags', function () {
        expect(contacts.addNewTag(contactObject, 'relative')).to.equal(false);
      });

      it('should transfer a tag from available tags to contact tags', function () {
        expected = [['friend', 'work', 'scientist'], ['programmer', 'relative']];
        contacts.transferAvailableTagToContact(contactObject, 'scientist');
        results = [contactObject.tags, contactObject.available_tags];
        expect(results).to.deep.equal(expected);
      });

      it('should format contact and available tags for the view', function () {
        expected = { tags: ['friend', 'work'], available_tags: ['programmer', 'relative', 'scientist'] }
        expect(contacts.formattedTagsForEditContact(secondContactObject)).to.deep.equal(expected);
      });
    });
  });
});