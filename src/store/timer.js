import * as moment from 'moment'
import { orderClearReservation } from './actions'

export function timerStartTimer() {
  return (dispatch, getState) => {
    let { timer, order } = getState()

    if (!order.reservation) {
      return
    }

    let expirationDate = moment().add(1, 'minutes')
    let cachedExpirationDate = localStorage.getItem('expirationDate')

    if (cachedExpirationDate) {
      expirationDate = moment(JSON.parse(cachedExpirationDate))
    }

    dispatch(timerRefreshTimer(expirationDate))
    localStorage.setItem('expirationDate', JSON.stringify(expirationDate));

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
    dispatch(orderClearReservation())

    alert('Timeout')
  }
}

export function timerClearTimer() {
  return (dispatch, getState) => {
    let { timer } = getState()
    localStorage.removeItem('expirationDate')
    clearInterval(timer.intervalHandler)

    return dispatch({
      type: 'clearTimer'
    })
  }
}

export function timer(state = {}, action) {
  switch (action.type) {

    case 'startTimer':
      return {
        timeLeft: null,
        expirationDate: action.expirationDate,
        intervalHandler: action.intervalHandler,
      }

    case 'refreshTimer':
      return {
        ...state,
        timeLeft: action.timeLeft,
      }

    case 'clearTimer':
      return null

    default:
      return state

  }
}
