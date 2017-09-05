import { AlertActions } from 'store/actions'

export default () => next => action => {
  return typeof action === 'function'
    ? next(async (dispatch, getState) => {
      try {
        return await action(dispatch, getState)
      } catch (error) {
        let response = error.response

        if (response && (response.data || response.statusText)) {
          return dispatch(AlertActions.addAlert('error',
            response.data
              ? response.data.errors
              : response.statusText))
        } else if (error && error.message) {
          console.log(error)
          return dispatch(AlertActions.addAlert('error', error.message))
        } else {
          throw error
        }
      }
    })
    : next(action)
}
