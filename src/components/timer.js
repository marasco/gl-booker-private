import React, { Component } from 'react'
import { connect } from 'react-redux'
import { timerStartTimer } from '../store/timer'

class Timer extends Component {

  componentDidMount = () => {
    this.props.timerStartTimer()
  }

  render() {
    return (this.props.timer && (
      <pre>{this.props.timer.timeLeft}</pre>
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
