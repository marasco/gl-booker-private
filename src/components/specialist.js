import React from 'react';
import Select from 'react-select';

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

  // componentWillUpdate = (nextProps, nextState) => {
  //   if (!nextProps.selected) {
  //     nextState.selectedSpecialist = 0
  //   }
  // }

  getOptions = () => {
    let specialists = this.props.specialists
    if( specialists.length && specialists[0].value ) {
      // Any specialist
      specialists.unshift({
          value:null,
          label:"Any"
      })
    }

    return specialists
  }

  render() {
    return (
      <Select
        placeholder={"Select specialist..."}
        styles={customStyles}
        isDisabled={!this.props.selected}
        value={ this.props.specialist }
        onChange={ this.props.onSpecialistChange }
        options={ (this.getOptions()) }
     />

    );
  }
}
export default Specialist;
