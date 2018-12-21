import { combineReducers } from 'redux'
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
export const initialState = {
  data: {
    specialists: {},
  },
  order: {
    date: null,
    treatments: treatments,
    slots: slots,
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
  let data = null
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
      localStorage.setItem('slots', JSON.stringify([action.slot]));
      return {
        ...state,
        slots: [ /*...state.slots,*/ action.slot ]
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

    default:
      return state
  }
}

export const reducers = combineReducers({ data, order })
