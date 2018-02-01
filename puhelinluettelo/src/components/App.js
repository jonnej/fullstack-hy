import React from 'react';

const Person = ({ person }) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )
}

const ListPersons = (props) => {
  let persons = props.persons
  const filter = props.filter
  if (filter !== '') {
    persons = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
  }
  console.log(this.persons)
  return (
    <div>
      {persons.map(person => <div key={person.id}><Person person={person} /></div>)}
    </div>
  )
}

const InputComponent = (props) => {
  return (
    <div>
      {props.text} <input value={props.value} onChange={props.onChange} />
    </div>
  )

}

const ButtonComponent = (props) => {
  return (
    <div>
      <button type={props.type}>{props.text}</button>
    </div>
  )
}

const FormComponent = (props) => {
  return (
    <div>
      <form onSubmit={props.submit}>
        <InputComponent text='Nimi:' value={props.state.newName} onChange={props.handleNewName} />
        <InputComponent text='Numero:' value={props.state.newNumber} onChange={props.handleNewNumber} />
        <ButtonComponent type='submit' text='Lisää' />
      </form>
    </div>
  )
}

const HeaderComponent = (props) => {
  return (
    <div>
      <h2>{props.text} </h2>
    </div>
  )
}
const ContactList = (props) => {
  console.log(props.state.persons)
  return (
    <div>
      <HeaderComponent text='Puhelinluettelo' />
      <InputComponent text='Rajaa näytettäviä nimellä:' value={props.state.filter} onChange={props.handleFilter} />
      <HeaderComponent text='Lisää uusi nimi ja numero' />
      <FormComponent submit={props.addNewName} state={props.state} />
      <HeaderComponent text='Numerot' />
      <ListPersons persons={props.state.persons} filter={props.state.filter} />
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: '050-1234567',
          id: 1
        },
        {
          name: 'Matti Meikäläinen',
          number: '044-1234567',
          id: 2
        },
        {
          name: 'Matti Muukalainen',
          number: '01234578-32',
          id: 3
        },
        {
          name: 'Arto V',
          number: '012-123-123',
          id: 4
        }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addNewName = (event) => {
    event.preventDefault()

    if (this.state.persons.some(person => person.name === this.state.newName)) {
      alert('Name already in list')
    } else {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1
      }

      const persons = this.state.persons.concat(personObject)
      this.setState({ persons: persons, newNote: '', newNumber: '' })
    }
  }

  handleNewName = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNewNumber = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilter = (event) => {
    this.setState({ filter: event.target.value })
  }



  render() {
    console.log(this.state.filter);


    return (
      <div>
          <ContactList state={this.state} handleNewName={this.handleNewName} handleNewNumber={this.handleNewNumber}
            handleFilter={this.handleFilter} addNewName={this.addNewName} />
      </div>
    )
  }
}

export default App