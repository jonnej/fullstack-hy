
const initialState = null


export const showNotification = (notification) => {
  return {
    type: 'NOTIFICATION',
    notification
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
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