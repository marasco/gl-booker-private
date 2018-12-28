import request from 'superagent'
import { API_URL } from '../App'
import { timerClearTimer } from './timer'

export function setSpecialists(treatment, specialists) {
  return {
    type: 'setSpecialists',
    treatment,
    specialists,
  }
}

export function addTreatment(treatment) {
  return {
    type: 'addTreatment',
    treatment
  }
}

export function removeTreatments() {
  return {
    type: 'removeTreatments'
  }
}

export function removeTreatment(treatment) {
  return {
    type: 'removeTreatment',
    treatment,
  }
}

export function selectSpecialist(treatment, specialist) {
  return {
    type: 'selectSpecialist',
    treatment,
    specialist,
  }
}

export function selectDate(date) {
  return {
    type: 'selectDate',
    date
  }
}

export function orderAddItem(slot) {
  return {
    type: 'orderAddItem',
    slot,
  }
}

export function orderRemoveItem(slot) {
  return {
    type: 'orderRemoveItem',
    slot,
  }
}

export function orderClearItems() {
  return {
    type: 'orderClearItems',
  }
}

export function orderAddReservation(reservation) {
  return {
    type: 'orderAddReservation',
    reservation, 
  }
}

export function orderCancelReservation(reservation) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let { access_token } = JSON.parse(localStorage.getItem('loggedUser'))

      request
        .delete(API_URL + '/appointment/reservation')
        .send({
          access_token,
          incompleteAppointmentId: reservation.id
        })
        .then(res => {
          if (res.body.IsSuccess) {
            dispatch({
              type: 'orderCancelReservation',
              reservation,
            })
            return resolve()
          }
          reject(new Error('Could not cancel reservation'))
        })
        .catch(reject)
    })
  }
}

export function orderClearReservation() {
  return (dispatch, getState) => {
    dispatch({
      type: 'orderClearReservation'
    })
    dispatch(timerClearTimer())
  }
}

export function orderComplete(order) {
  return dispatch => {
    dispatch(dataSaveOrder(order))
    dispatch({
      type: 'orderComplete',
      order,
    })
  }
}

export function dataSaveOrder(order) {
  return {
    type: 'dataSaveOrder',
    order,
  }
}

export function timerSetExpiration(date) {
  return {
    type: 'timerSetExpiration',
    date,
  }
}
