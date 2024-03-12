import React from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleOnClick} className={props.className}>
      {props.text}
    </button>
  )
}

export default Button
