import API from '../API'

export function addTreatment(treatmentId) {
  return dispatch => {
    dispatch({
      type: 'addTreatment',
      treatmentId
    });

    API.fetchSpecialists(treatmentId).then(response => {
      let specialists = response.body.Results.map(record => ({ ...record,
        value: record.ID,
        label: [record.LastName, record.FirstName].join(', '),
      }))

      dispatch({
        type: 'setSpecialists',
        treatmentId,
        specialists,
      })
    })
    .catch(error => {
      alert('Error Loading specialists');
      dispatch({
        type: 'removeTreatment',
        treatmentId
      })
    })
  }
}

export function removeTreatment(treatmentId) {
  return {
    type: 'removeTreatment',
    treatmentId,
  }
}

export function selectSpecialist(treatmentId, specialistId) {
  return {
    type: 'selectSpecialist',
    treatmentId,
    specialistId,
  }
}
