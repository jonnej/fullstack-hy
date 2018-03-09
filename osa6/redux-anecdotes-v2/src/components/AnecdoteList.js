import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {

  handleClickVote = (anecdote) => async () => {
    this.props.voteAnecdote(anecdote.id)
    this.props.showNotification(`You voted: ${anecdote.content}`)

    setTimeout(() => {
      this.props.removeNotification()
    }, 5000)
  }
  render() {
    console.log(this.props.anecdotes)

    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleClickVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filteredAndSortedAnecdotes = (anecdotes, filter) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
    .filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: filteredAndSortedAnecdotes(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { voteAnecdote, showNotification, removeNotification }
)(AnecdoteList)
