import API from '../API'

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
