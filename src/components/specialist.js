import React from 'react';
import Select from 'react-select';
import request from 'superagent'
import { API_URL } from '../App'

const customStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white', height: '40', border:'none',borderRadius:0 }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      height: '40',
      backgroundColor: isDisabled
        ? null
        : isSelected ? 'black' : isFocused ? '#e1e1e1' : 'white',
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? 'white'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}
class Specialist extends React.Component {




  constructor(props) {
    super(props);

    this.state = {
      selectedSpecialist: 0,
      specialists: []
    };

    this.loadSpeacialists();
  }

  loadSpeacialists() {
    request
    .get(API_URL + '/employees')
    .set('Authorization', 'Bearer xxxx')
    .query({
        pageSize: 100,
        treatmentId: this.props.treatmentId,
    })
    .then(res=>{
        console.log('res',res.body)
        this.setState({
          specialists: res.body.Results.map(record => ({
            id: record.ID,
            name: [record.LastName, record.FirstName].join(', '),
          }))
        })
    }).catch(error => {
        console.log(error)
    });
  }
  
  render() {
    return (

      <Select
        styles={customStyles}
        value={(()=>{
          return this.state.selectedSpecialist
        })()}
        onChange={(obj)=>{
            this.setState({selectedSpecialist:obj})
        }}
        
        options={(()=>{
            let options = []

            this.state.specialists.map((obj)=>{
                options.push({
                  value:obj.id,
                  label:obj.name
                })
                return obj;
            })
            return options;
           

        })()}
     />

    );
  }
}
export default Specialist;