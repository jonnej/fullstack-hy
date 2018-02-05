import React from 'react';
import ContactList from './ContactList';
import personService from '../services/persons';
import '../index.css'



const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
    }
  }

  componentDidMount() {
    personService.getAll().then(persons => {
      this.setState({ persons })
    })
  }

  addNewName = (event) => {
    event.preventDefault()

    if (this.state.persons.some(person => person.name === this.state.newName)) {
      if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const person = this.state.persons.find(person => person.name === this.state.newName)
        const updatedPerson = { ...person, number: this.state.newNumber }
        personService
          .update(person.id, updatedPerson)
          .then(updatedPerson => {
            const persons = this.state.persons.filter(person => person.name !== this.state.newName)
            this.setState({
              persons: persons.concat(updatedPerson), newName: '', newNumber: '', message: `${updatedPerson.name} numero päivitettiin onnistuneesti`
            })
            setTimeout(() => {
              this.setState({message: null})
            }, 5000)
          })
          .catch(error => {
            alert('Muokattava henkilö on poistettu tietokannasta')
          })
          
      }
    } else {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber,
      }
      personService
        .create(personObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newNumber: '',
            message: `${personObject.name} luotiin onnistuneesti`
          })
        })
      setTimeout(() => {
      this.setState( {message: null})
      }, 5000)

    }
  }

  deletePerson = (id) => {
    const person = this.state.persons.find(person => person.id === id)

    if (window.confirm(`Haluatko poistaa ${person.name}?`)) {
      personService.deletePerson(id).then(response => {
        this.setState({ persons: this.state.persons.filter(person => person.id !== id), message: 'Henkilö poistettiin onnistuneesti' })
      })
      .catch(error => {
        alert('Henkilö on jo poistettu tietokannasta')
      })
      setTimeout(() => {
        this.setState( {message: null})
        }, 5000)
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

    return (
      <div>
        <Notification message={this.state.message} />
        <ContactList state={this.state} handleNewName={this.handleNewName} handleNewNumber={this.handleNewNumber}
          handleFilter={this.handleFilter} addNewName={this.addNewName} deletePerson={this.deletePerson} />
      </div>
    )
  }
}

export default App