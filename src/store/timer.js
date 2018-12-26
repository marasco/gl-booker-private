import * as moment from 'moment'

export function timerStartTimer() {
  return (dispatch, getState) => {
    let { timer } = getState()

    let expirationDate = moment().add(1, 'minutes')

    if (timer && timer.intervalHandler) {
      clearInterval(timer.intervalHandler)
    }

    let intervalHandler = setInterval(
      () => dispatch(timerRefreshTimer(expirationDate)), 1000
    )

    dispatch({
      type: 'startTimer',
      expirationDate,
      intervalHandler,
    })

    dispatch(timerRefreshTimer(expirationDate))
  }
}

export function timerRefreshTimer(expirationDate) {
  return dispatch => {
    if (moment() >= expirationDate) {
      return dispatch(timerExpired())
    }
    return dispatch({
      type: 'refreshTimer',
      timeLeft: moment(expirationDate.diff(moment())).format('m:ss')
    })
  }
}

export function timerExpired() {
  return (dispatch, getState) => {
    let { timer } = getState()

    clearInterval(timer.intervalHandler)
    alert('Timeout')

    return dispatch({
      type: 'timerExpired',
    })
  }
}

export function timer(state = {}, action) {
  switch (action.type) {

    case 'startTimer':
      return {
        expired: false,
        timeLeft: null,
        expirationDate: action.expirationDate,
        intervalHandler: action.intervalHandler,
      }

    case 'refreshTimer':
      return {
        ...state,
        timeLeft: action.timeLeft,
      }

    case 'timerExpired':
      return {
        ...state,
        expired: true,
      }

    default:
      return state

  }
}
