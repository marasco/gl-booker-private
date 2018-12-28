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
export function orderCancelReservation() {
   return (dispatch, getState) => {
     let { order: { reservation } } = getState()
     let { access_token } = JSON.parse(localStorage.getItem('loggedUser'))

      return new Promise((resolve, reject) => {
       if (!reservation) {
         resolve()
       }

        request
         .delete(API_URL + '/appointment/reservation')
         .send({
           access_token,
           incompleteAppointmentId: reservation.id
         })
         .then(res => {
           if (res.body.IsSuccess) {
             dispatch(orderClearReservation())
             return resolve()
           }
           throw new Error('Could not cancel reservation');
         })
         .catch(reject)
     })

      reservation && request
       .delete(API_URL + '/appointment/reservation')
       .send({
         access_token,
         incompleteAppointmentId: reservation.id
       })
       .then(res => {
         if (res.body.IsSuccess) {
           return dispatch(orderClearReservation())
         }
         throw new Error('Could not cancel reservation');
       })
       .catch(error => alert(error.message))
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
