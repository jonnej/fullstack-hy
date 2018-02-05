import React from 'react';
import Person from './Person';

const ListPersons = (props) => {
    let persons = props.persons
    const filter = props.filter
    if (filter !== '') {
      persons = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    }
  
    return (      
      <div>
          {persons.map(person => <div key={person.id}><Person person={person} deletePerson={props.deletePerson} /></div>)}
      </div>
    )
  }

  export default ListPersons