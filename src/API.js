import request from 'superagent'
import { API_URL } from './App'

export default {

  fetchSpecialists: treatmentId => {
    return request
    .get(API_URL + '/employees')
    .set('Authorization', 'Bearer xxxx')
    .query({
      pageSize: 100,
      treatmentId,
    })
  }

}
