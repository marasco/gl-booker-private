import React, { Component } from 'react'
import Treatment from './treatment'
import Calendar from './calendar'
export const DEBUG_MODE = process.env.REACT_APP_DEBUG_MODE;

export default class Wizard extends Component {
  constructor(props){
      super(props)
  }

  state = {
    data: {
      date: null,
      treatment: null,
      specialist: null,
    }
  }

  push = (state) => {
    // Let steps components push data to "data" state attribute.
    this.setState(prev => ({ ...prev, data: { ...this.state.data, ...state } }))
  }

  validate = () => {
    let step = this.steps[this.state.step]

    if (!step.validator) {
      return true
    }

    try {
      step.validator()
      return true
    }
    catch (e) {
      alert(e)
    }
  }

  scrollDown = () => {
      window.scroll({
          behavior: 'smooth',
          left: 0,
          top: document.documentElement.scrollHeight
      });
  }

  render() {
    let treatments = React.createElement(Treatment, {
      // Pass shared data between sub-components.
      data: this.state.data,
      // Push sub-component data shared between sub-components.
      push: this.push
    })
    let calendar = React.createElement(Calendar, {
      // Pass shared data between sub-components.
      data: this.state.data,
      // Push sub-component data shared between sub-components.
      push: this.push,
      scrollDown: this.scrollDown
    })

    return (
      <div>
        {
          (DEBUG_MODE===1
          )?
          <pre>{ JSON.stringify(this.state.data, null, 2) }</pre>:<div></div>
        }
        <div className="centered col-xs-12">
          { treatments }
        </div>
        {
            (this.state.data.specialist) ? <div className="centered col-xs-12">
                { calendar }
            </div> : <span></span>
        }
      </div>
    )
  }

}
