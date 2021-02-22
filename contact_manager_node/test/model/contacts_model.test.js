import { expect } from 'chai';
import { ContactsModel } from "../../public/javascripts/model/contacts_model";

describe('Contact Model', function () {
  let contacts, expected, results;
  beforeEach(() => {
    contacts = Object.create(ContactsModel).init();
  });
  describe('Header Information Initialize Contact And Tag Data', function () {
    it('should provide header information for Add Contact', function () {
      expect(contacts.addContactHeader).to.equal('Create Contact');
    });

    it('should provide header information for Edit Contact', function () {
      expect(contacts.editContactHeader).to.equal('Edit Contact');
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
  });

  describe('Contact And Tag Behavior', function () {
    let serverContactData;
    beforeEach(() => {
      serverContactData = [
        {
          id: 1,
          full_name: "Naveed Fida",
          email: "nf@example.com",
          phone_number: "12345678901",
          tags: "work,friend"
        },
        {
          id: 2,
          full_name: "Victor Reyes",
          email: "vpr@example.com",
          phone_number: "09876543210",
          tags: "work,friend"
        },
        {
          id: 3,
          full_name: "Pete Hanson",
          email: "ph@example.com",
          phone_number: "54321098761",
          tags: "work"
        },
        {
          id: 4,
          full_name: "Eric Ricketts",
          email: "eric_ricketts@icloud.com",
          phone_number: "9194495529",
          tags: null
        },
        {
          id: 5,
          full_name: "Wendy Ricketts",
          email: "wendy_ricketts@icloud.com",
          phone_number: "9194495456",
          tags: "relative"
        },
        {
          id: 6,
          full_name: "Marilyn Ricketts",
          email: "marilynricketts@icloud.com",
          phone_number: "7036085704",
          tags: "relative"
        }
      ];
      contacts.storeAllContactData(serverContactData);
      contacts.storeAllUniqueTagData(serverContactData);
    });

    describe('Contact Behavior', function () {
      it('should store all contact information', function () {
        expect(contacts.allContacts).to.deep.equal(serverContactData);
      });
      
      it('should put the all contacts data in a format prepared for viewing', function () {
        expected = { contacts : serverContactData };
        expect(contacts.formattedAllContactData()).to.deep.equal(expected);
      });

      it('should provide an object representing the search results', function () {
        expected = { contacts: [
            {
              id: 4,
              full_name: "Eric Ricketts",
              email: "eric_ricketts@icloud.com",
              phone_number: "9194495529",
              tags: null
            },
            {
              id: 6,
              full_name: "Marilyn Ricketts",
              email: "marilynricketts@icloud.com",
              phone_number: "7036085704",
              tags: "relative"
            }
          ]
        }
        expect(contacts.search('ri')).to.deep.equal(expected);
      });

      it('should provide an object representing no search results', function () {
        expected = { contacts: [] };
        expect(contacts.search('ze')).to.deep.equal(expected);
      });
    });

    describe('Tag Behavior', function () {
      it('should store all of the tag information', function () {
        expected = ['friend', 'relative', 'work'];
        expect(contacts.allUniqueTags).to.deep.equal(expected);
      });

      it('should return all the contacts with a given tag', function () {
        expected = [
          {
            id: 1,
            full_name: "Naveed Fida",
            email: "nf@example.com",
            phone_number: "12345678901",
            tags: "work,friend"
          },
          {
            id: 2,
            full_name: "Victor Reyes",
            email: "vpr@example.com",
            phone_number: "09876543210",
            tags: "work,friend"
          },
          {
            id: 3,
            full_name: "Pete Hanson",
            email: "ph@example.com",
            phone_number: "54321098761",
            tags: "work"
          }
        ];
        expect(contacts.findContactsWithTag('work')).to.deep.equal(expected);
      });

      it('should return an empty array if no contacts have the given tag', function () {
        expect(contacts.findContactsWithTag('foo')).to.deep.equal([]);
      });
    });
  });
});