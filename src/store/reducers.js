import { combineReducers } from 'redux'

export const initialState = {
  wizard: {
    data: {
      treatments: [],
      specialists: {},
    },
    treatments: [],
  },
}

function wizard(state = {}, action) {
  switch (action.type) {

    case 'addTreatment':
      return {
        ...state,
        treatments: [
          ...state.treatments, {
            treatmentId: action.treatmentId,
            specialistId: null,
          }
        ],
      }

    case 'removeTreatment':
      return {
        ...state,
        treatments: state.treatments.filter(item => {
          return item.treatmentId !== action.treatmentId
        })
      }

    case 'setSpecialists':
      return {
        ...state,
        data: {
          ...state.data,
          specialists: {
            ...state.data.specialists,
            [action.treatmentId]: action.specialists
          }
        }
      }

    case 'selectSpecialist':
      return {
        ...state,
        treatments: state.treatments.map(item => {
          if (item.treatmentId === action.treatmentId) {
            return { ...item, specialistId: action.specialistId || null }
          }
          return item
        })
      }

    default:
      return state
  }
}

export const reducers = combineReducers({ wizard })
