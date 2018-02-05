import React from 'react';
import Input from './Input';

const Form = (props) => {
    return (
      <div>
        <form onSubmit={props.submit}>
          <Input text='Nimi:' value={props.state.newName} onChange={props.handleNewName} />
          <Input text='Numero:' value={props.state.newNumber} onChange={props.handleNewNumber} />
          <button type='submit'>Lisää</button>
        </form>
      </div>
    )
  }

  export default Form