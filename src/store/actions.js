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

export function orderSetReservation(reservation) {
  return {
    type: 'orderSetReservation',
    reservation,
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
    dispatch(orderClearItems())
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
