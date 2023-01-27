import React, { Component } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContaktForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-132-563' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-892-122' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-127-729' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-921-262' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const normalizedCase = name.toLowerCase();

    const contactAdded = this.state.contacts.find(el => {
      if (el.name.toLowerCase() === normalizedCase) {
        alert(`${name} is already in contacts`);
        return true;
      }
      return false;
    });

    if (contactAdded) {
      return;
    }

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedCase)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const filtered = this.filteredContacts();
    let numberOfSearch = filtered.length;
    return (
      <div className={css.app}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contact</h2>

        <div>
          <Filter
            value={filter}
            onChange={this.changeFilter}
            result={numberOfSearch}
          />
          <ContactList contacts={filtered} deleteContact={this.deleteContact} />
        </div>
      </div>
    );
  }
}

export default App;
