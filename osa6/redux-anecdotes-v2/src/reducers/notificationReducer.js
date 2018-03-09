const initialState = null

export const notify = (notification, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFICATION',
      notification
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, seconds * 1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  if (action.type === 'NOTIFICATION') {
    return action.notification
  }
  if (action.type === 'REMOVE_NOTIFICATION') {
    return initialState
  }
  return state
}

export default notificationReducer