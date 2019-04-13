import React from 'react'

export default function Display(props) {
  const { balls, strikes } = props

  return (
    <>
      <div>{`Balls: ${balls}`}</div>
      <div>{`Strikes: ${strikes}`}</div>
    </>
  )
}

