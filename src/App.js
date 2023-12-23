import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  // Fetch contacts from JSONPlaceholder API
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      setContacts(response.data);
    });
  }, []);

  const addContact = async () => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        newContact
      );

      setContacts([...contacts, response.data]);
      setNewContact({ name: '', phone: '' });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedContacts = contacts.filter((contact) => contact.id !== id);
      setContacts(updatedContacts);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const editContact = (index) => {
    setNewContact(contacts[index]);
    setEditIndex(index);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  return (
    <div>
      <h1>Contact Manager</h1>
      <div>
        Enter Your Name: 
        <input
          type="text"
          placeholder="Name"
          value={newContact.name}
          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        />
        <br />
        Enter Phone Number: 
        <input
          
          type="text"
          placeholder="Phone"
          value={newContact.phone}
          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
        />

        <br />
        <button onClick={addContact}>
          {editIndex !== -1 ? 'Update Contact' : 'Add Contact'}
        </button>
      </div>
      <div>
        Search Conatct: 
        <input
          type="text"
          placeholder="Search Contacts"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul>
        {filteredContacts.map((contact, index) => (
          <li key={index}>
            {contact.name} - {contact.phone}
            <button onClick={() => editContact(index)}>Edit</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <ContactManager />
    </div>
  );
}

export default App;
