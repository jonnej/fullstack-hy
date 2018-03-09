import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { showNotification, removeNotification } from './reducers/notificationReducer'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import { changeFilter } from './reducers/filterReducer'

class App extends React.Component {

  render() {
    console.log(this.props)
    // console.log(this.props.store.getState().notification)
    return (
      <div>
        <h1>Programming anecdotes</h1>

        {this.props.notification !== null
          && <Notification />
        }
        <Filter />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  showNotification,
  removeNotification,
  createAnecdote,
  voteAnecdote,
  changeFilter
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp