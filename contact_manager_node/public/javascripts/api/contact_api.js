let ContactApi = {
  addContact: function(encodedFormData) {
    return fetch('http://localhost:3000/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodedFormData
    })
      .then(response => response.json());
  },
  getAllContacts: function() {
    return fetch('http://localhost:3000/api/contacts')
      .then(response => response.json());
  },
  getContactById: function(id) {
    return fetch(`http://localhost:3000/api/contacts/${id}`)
      .then(response => response.json());
  },
  deleteContact: function(id) {
    return fetch(`http://localhost:3000/api/contacts/${id}`, {
      method:'DELETE'
    })
  },
  updateContact: function(id, encodedFormData) {
    return fetch(`http://localhost:3000/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodedFormData
    })
      .then(response => response.json());
  }
}

export { ContactApi };