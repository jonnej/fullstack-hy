import React from 'react';
import Header from './Header';
import Input from './Input';
import Form from './Form';
import ListPersons from './ListPersons';

const ContactList = (props) => {
    
    return (
      <div>
        <Header text='Puhelinluettelo' />
        <Input text='Rajaa näytettäviä nimellä:' value={props.state.filter} onChange={props.handleFilter} />
        <Header text='Lisää uusi nimi ja numero TAI muokkaa jo olemassa olevaa' />
        <Form submit={props.addNewName} state={props.state} handleNewName={props.handleNewName} handleNewNumber={props.handleNewNumber} />
        <Header text='Numerot' />
        <ListPersons persons={props.state.persons} filter={props.state.filter} deletePerson={props.deletePerson} />
      </div>
    )
  }

  export default ContactList