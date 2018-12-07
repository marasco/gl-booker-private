import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Treatment from './treatment'
import Calendar from './calendar'
import BookResults from './bookResults'

export default class Wizard extends Component {

  steps = [{
    component: Treatment,
    validator: null,
    state: null,
  },{
    component: Calendar,
    validator: null,
    state: null,
  },{
    component: BookResults,
    validator: null,
    state: null,
  }]

  state = {
    step: 0,
    data: {
      treatment: null,  // Pushed by <Treatment>
      specialist: null, // Pushed by <Treatment>
    },
  }

  hasNext = () => {
    return this.state.step < this.steps.length - 1
  }

  hasPrev = () => {
    return this.state.step > 0
  }

  next = () => {
    if (this.validate()) {
      this.setState(prev => ({ ...prev, step: this.state.step + 1 }))
    }
  }

  prev = () => {
    this.setState(prev => ({ ...prev, step: this.state.step - 1 }))
  }

  save = (step, state) => {
    // Save step component state.
    this.steps[step].state = state
  }

  push = (state) => {
    // Let steps components push data to "data" state attribute.
    this.setState(prev => ({ ...prev, data: { ...this.state.data, ...state } }))
  }

  validator = (step, fn) => {
    this.steps[step].validator = fn
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

  render() {
    let step = this.steps[this.state.step]
    let component = React.createElement(step.component, {
      // Step specific-data including saved state.
      step,
      // Method to save sub-component state.
      save: this.save.bind(this, this.state.step),
      // Push sub-component data shared between sub-components.
      push: this.push,
      // Let sub-component provide a validation callback.
      validator: this.validator.bind(this, this.state.step),
    })

    return (
      <div>

      <pre>{ JSON.stringify(this.state.data, null, 2) }</pre>

      <div className="centered col-xs-12">
      { component }
      </div>

      <div className="centered col-xs-12">
      {this.hasPrev() && (
        <Button bsStyle="primary" className="marginTop20" onClick={ this.prev }>PREV</Button>
      )}

      {this.hasNext() && (
        <Button bsStyle="primary" className="marginTop20 marginBottom20" onClick={ this.next }>NEXT</Button>
      )}
      </div>
      </div>
    )
  }

}
