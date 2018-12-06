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
    this.steps[step].state = state
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
    let save = this.save.bind(this, this.state.step)
    let validator = this.validator.bind(this, this.state.step)
    let component = React.createElement(step.component, { step, save, validator })

    return (
      <div className="centered col-xs-12">

      { component }

      {this.hasPrev() && (
        <Button bsStyle="primary" onClick={ this.prev }>PREV</Button>
      )}

      {this.hasNext() && (
        <Button bsStyle="primary" onClick={ this.next }>NEXT</Button>
      )}

      </div>
    )
  }

}
