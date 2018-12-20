import { combineReducers } from 'redux'

export const initialState = {
  data: {
    specialists: {},
  },
  order: {
    date: null,
    items: {},
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
        items: {
          ...state.items,
          [action.treatment.ID]: {
            treatment: action.treatment,
            specialist: null,
          }
        }
      }

    case 'removeTreatment':
      let items = { ...state.items }
      delete(items[action.treatment.ID])
      return { ...state, items }

    case 'selectSpecialist':
      let treatment = { ...state.items[action.treatment.ID], specialist: action.specialist }
      return {
        ...state,
        items: {
          ...state.items,
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
        slots: [ ...state.slots, action.slot ]
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
