import React from 'react';
import Calendar from 'react-calendar';
import { Button } from 'react-bootstrap';



class Calendario extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        date: new Date(),
        visibleClass:  'no-visible',
        bookClass: 'no-visible'
      }
  }
  goToStep = (step) => {
    if (step===2)
      this.setState({visibleClass: "visible"})
    if (step===3)
      this.setState({bookClass: "visible"})
  }
  onChange = date => this.setState({ date })

  render() {

    return (
      <div className="col-xs-12 centered marginTop20">
        <Calendar className="fix"
          onChange={this.onChange}
          value={this.state.date}
          tileDisabled={({activeStartDate, date, view }) => date.getDate() % 2}
        />
      </div>
    );
  }
}
export default Calendario;
