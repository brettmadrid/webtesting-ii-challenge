import React from 'react'

export default function Display(props) {
  const { balls, strikes } = props

  return (
    <>
      <div data-testid="balls-count">{`Balls: ${balls}`}</div>
      <div data-testid="strikes-count">{`Strikes: ${strikes}`}</div>
    </>
  )
}

