import React from 'react';

class App extends React.Component {

  addVote = (id) => (event) => {
    this.props.store.dispatch({
      type: "ADD_VOTE",
      data: {
        id: id
      }
    })
  }

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: "ADD_ANECDOTE",
      data: {
        content: content
      }
    })
  }

  render() {
    const anecdotes = this.props.store.getState().sort((a,b) => {
      return b.votes - a.votes 
    })
    console.log(anecdotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote' /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App