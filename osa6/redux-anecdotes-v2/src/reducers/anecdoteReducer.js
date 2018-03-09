import anecdoteService from '../services/anecdotes'


export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update({ ... anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

const reducer = (state = [], action) => {
  if (action.type === 'VOTE') {
    const old = state.filter(a => a.id !== action.data.id)
    const voted = state.find(a => a.id === action.data.id)
    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {
    return [...state, action.data]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return state
}

export default reducer