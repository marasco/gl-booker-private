import request from 'superagent'
import { API_URL, API_USER, API_PASS } from './App'

export default {

  fetchSpecialists: treatmentId => {
    return request
    .get(API_URL + '/employees')
    .auth(API_USER, API_PASS)
    .query({
      pageSize: 100,
      treatmentId,
    })
  }

}
