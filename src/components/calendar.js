import React from 'react';
import Calendar from 'react-calendar';
import { Button } from 'react-bootstrap';
import BookResults from './bookResults';



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
      <div>
      <div>
      <div className="col-xs-12 centered marginTop20">

          <Button bsStyle="primary"  onClick={() => this.goToStep(2) } >Next</Button>
      </div>
      <div className="row col-xs-12 marginTop20">
      <div className={"calendar " + this.state.visibleClass}>
        <Calendar className="fix"
          onChange={this.onChange}
          value={this.state.date}
          tileDisabled={({activeStartDate, date, view }) => date.getDate() % 2}
        />
        <div className="col-xs-12 centered marginTop20">
          <Button bsStyle="primary"  onClick={() => this.goToStep(3) } >Next</Button>
       </div>
      </div>
      </div>
      </div>
      <div className={this.state.bookClass}>
      <BookResults />
      </div>
      </div>
    );
  }
}
export default Calendario;
