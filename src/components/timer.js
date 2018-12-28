import React, { Component } from 'react'
import { connect } from 'react-redux'
import { timerStartTimer } from '../store/timer'

class Timer extends Component {

  componentDidMount = () => {
    this.props.timerStartTimer()
  }

  render() {
    return (this.props.timer && (
      <div className="timer-div">Please complete your booking in <strong>{this.props.timer.timeLeft}</strong></div>
    ))
  }

}

const mapStateToProps = state => ({
    timer: state.timer,
})

const mapDispatchToProps = dispatch => ({
  timerStartTimer: () => dispatch(timerStartTimer()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
