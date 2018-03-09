const initialState = ''


export const changeFilter = (filter) => {
  return {
    type: 'FILTER',
    filter
  }
}

const filterReducer = (state = initialState, action) => {
  if (action.type === 'FILTER') {
    return action.filter
  }
  return state

}

export default filterReducer