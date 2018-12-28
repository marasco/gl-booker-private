import { combineReducers } from 'redux'
import { timer } from './timer'
let slots = localStorage.getItem('slots')
if (slots){
  slots = JSON.parse(slots)
}else{
  slots = []
}
let treatments = localStorage.getItem('treatments')
if (treatments){
  treatments = JSON.parse(treatments)
}else{
  treatments = {}
}
let reservation = localStorage.getItem('reservation')
if (reservation) {
  reservation = JSON.parse(reservation)
}else{
  reservation = null
}
export const initialState = {
  data: {
    orders: [],
    specialists: {},
  },
  order: {
    date: null,
    treatments: treatments,
    slots: slots,
    reservation: reservation,
  },
  timer: null,
}

function data(state = {}, action) {
  switch (action.type) {

    case 'setSpecialists':
      return {
        ...state,
        specialists: {
          ...state.specialists,
          [action.treatment.ID]: action.specialists
        }
      }

    case 'dataSaveOrder':
      return {
        ...state,
        orders: [
          ...state.orders,
          action.order,
        ]
      }

    default:
      return state
  }
}

function order(state = {}, action) {
  let data
  let slots
  switch (action.type) {

    case 'addTreatment':
      data = {
        ...state.treatments,
        [action.treatment.ID]: {
          treatment: action.treatment,
          specialist: null,
        }
      }
      console.log('add_treat t=>',data)

      localStorage.setItem('treatments', JSON.stringify(data));

      return {
        ...state,
        treatments: data
      }

    case 'removeTreatments':
      delete({ ...state.treatments })
      localStorage.setItem('treatments', JSON.stringify([]));

      return { ...state, treatments: [] }
    case 'removeTreatment':
      let data = { ...state.treatments }
      delete(data[action.treatment.ID])
      console.log('remove_treat t=>',data)
      localStorage.setItem('treatments', JSON.stringify(data));

      return { ...state, treatments: data }

    case 'selectSpecialist':
      let treatment = { ...state.treatments[action.treatment.ID], specialist: action.specialist }
      data = {
        ...state.treatments,
        [action.treatment.ID]: treatment
      }
      localStorage.setItem('treatments', JSON.stringify(data));
      return {
        ...state,
        treatments: data
      }
      return state

    case 'selectDate':
      return {
        ...state,
        date: action.date
      }

    case 'orderAddItem':
      let index = localStorage.getItem('useIndex');
      slots = JSON.parse(localStorage.getItem('slots'))
      if (!slots){
        slots = []
      }
      slots[index]=action.slot
      console.log('updating slot:',slots)
      localStorage.setItem('slots', JSON.stringify(slots));
      return {
        ...state,
        slots: slots
      }

    case 'orderRemoveItem':
      let slots = state.slots.filter(slot => {
        return slot !== action.slot
      })
      localStorage.setItem('slots', JSON.stringify(slots));
      return {
        ...state,
        slots: slots
      }

    case 'orderClearItems':
      localStorage.setItem('slots', JSON.stringify([]));
      return {
        ...state,
        slots: [],
      }

    case 'orderAddReservation':
      let reservations = JSON.parse(localStorage.getItem('reservation'))
      if (!reservations){
        reservations = []
      }
      reservations.push(action.reservation)
      localStorage.setItem('reservation', JSON.stringify(reservations));
      return {
        ...state,
        reservation: reservations,
      }

    case 'orderClearReservation':
      localStorage.removeItem('reservation');
      return {
        ...state,
        reservation: null,
      }

    case 'orderComplete':
      return { ...initialState.order }

    default:
      return state
  }
}

export const reducers = combineReducers({ data, order, timer })
