import { combineReducers } from 'redux'

export const initialState = {
  order: {
    items: {},
  },
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

    default:
      return state
  }
}

export const reducers = combineReducers({ order })
