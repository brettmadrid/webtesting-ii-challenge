import React from "react";

export default function Dashboard(props) {
  return (
    <>
      <button data-testid="bButton" onClick={() => props.ballsHandler()}>
        Ball Count
      </button>
      <button data-testid="sButton" onClick={() => props.strikesHandler()}>
        Strike Count
      </button>
      <button data-testid="foulButton" onClick={() => props.foulHandler()}>
        Foul Ball
      </button>
      <button data-testid="hitButton" onClick={() => props.hitHandler()}>
        Hit
      </button>
    </>
  );
}
