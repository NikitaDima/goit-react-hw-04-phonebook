import { useState } from 'react';
import ContactForm from './contactForm/ContactForm';
import Filter from './filter/Filter';
import ContactList from './contactList/ContactList';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const formSubmitHendler = newContacts => {
    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === newContacts.name.toLowerCase()
    );
    if (isNameExists) {
      alert(`${newContacts.name}is already in contacts`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, newContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getFilteredContacts();

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHendler}></ContactForm>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </>
  );
}
