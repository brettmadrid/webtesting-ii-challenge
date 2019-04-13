import React from "react";

export default function Dashboard(props) {
  return (
    <>
      <button onClick={() => props.ballsHandler()}>Increase Balls</button>
      <button onClick={() => props.strikesHandler()}>Increase Strikes</button>
    </>
  );
}
