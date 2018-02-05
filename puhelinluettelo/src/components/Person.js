import React from 'react';

const Person = (props) => {
  const person = props.person
  return (
    <div>
      {person.name} {person.number} <button onClick={() => props.deletePerson(person.id)}>Poista</button>
    </div>
  )
}

export default Person