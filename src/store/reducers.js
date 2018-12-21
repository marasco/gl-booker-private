import { combineReducers } from 'redux'

export const initialState = {
  data: {
    specialists: {},
  },
  order: {
    date: null,
    treatments: {},
    slots: [],
  },
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

    default:
      return state
  }
}

function order(state = {}, action) {
  switch (action.type) {

    case 'addTreatment':
      return {
        ...state,
        treatments: {
          ...state.treatments,
          [action.treatment.ID]: {
            treatment: action.treatment,
            specialist: null,
          }
        }
      }

    case 'removeTreatment':
      let treatments = { ...state.treatments }
      delete(treatments[action.treatment.ID])
      return { ...state, treatments }

    case 'selectSpecialist':
      let treatment = { ...state.treatments[action.treatment.ID], specialist: action.specialist }
      return {
        ...state,
        treatments: {
          ...state.treatments,
          [action.treatment.ID]: treatment
        }
      }
      return state

    case 'selectDate':
      return {
        ...state,
        date: action.date
      }

    case 'orderAddItem':
      return {
        ...state,
        slots: [ /*...state.slots,*/ action.slot ]
      }

    case 'orderRemoveItem':
      return {
        ...state,
        slots: state.slots.filter(slot => {
          return slot !== action.slot
        })
      }

    case 'orderClearItems':
    debugger
      return {
        ...state,
        slots: [],
      }

    default:
      return state
  }
}

export const reducers = combineReducers({ data, order })
