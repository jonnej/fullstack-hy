import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { anecdoteInitialization } from './reducers/anecdoteReducer'


class App extends React.Component {

  componentDidMount = async () => {
    this.props.anecdoteInitialization()
  }

  render() {
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
  anecdoteInitialization
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp