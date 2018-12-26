import React from 'react'

function Timer(props) {
  return (props.timer && props.timer.expired === false && (
    <pre>{props.timer.timeLeft}</pre>
  ))
}

export default Timer;
