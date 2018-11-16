import React from 'react';
import Select from 'react-select';

class Specialist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSpecialist: 0,
      specialists: [
      {id:0, name: "Anyone"},
      {id:1, name: "Fran"},
      {id:2, name: "Pablo"},
      {id:3, name: "Gonzalo"}
      ]
    };
  }
  

  render() {
    return (

      <Select
        value={this.state.selectedSpecialist}
        onChange={(e)=>{
            let value = (e.target.value)?e.target.value:0
            this.setState({selectedSpecialist:value})
        }}
        
        options={(()=>{
            let options = []

            this.state.specialists.map((obj)=>{
                options.push({
                  value:obj.id,
                  label:obj.name
                })
                  })
            return options;
           

        })()}
     />

    );
  }
}
export default Specialist;