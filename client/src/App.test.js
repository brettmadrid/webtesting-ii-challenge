import React from "react";
import { render, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";

import App from "./App";

it("renders without crashing", () => {
  render(<App />);
});

it("displays baseball count", () => {
  const { getByText } = render(<App />);
  const text = getByText(/scoreboard/i);
  expect(text).toBeInTheDocument();
});

it('should render ball increase when balls button clicked and reset to zero on the fourth ball', () => {
  const { getByText, getByTestId } = render(<App />)
  const button = getByTestId('bButton');
  fireEvent.click(button);
  const buttonResult = getByText(/Balls:/i).textContent;
  expect(buttonResult).toBe('Balls: 1');
  fireEvent.click(button); // Balls: 2
  fireEvent.click(button); // Balls: 3
  fireEvent.click(button); // 4th ball, should reset to zero
  const fourthBall = getByText(/Balls:/i).textContent;
  expect(fourthBall).toBe('Balls: 0');
})

it('should render strike increase when strikes button clicked', () => {
  const { getByText, getByTestId } = render(<App />)
  const button = getByTestId('sButton');
  fireEvent.click(button);
  const buttonResult = getByText(/Strikes:/i).textContent;
  expect(buttonResult).toBe('Strikes: 1');
})

it('should increase strike count only if there are less than two strikes when the foul button is hit', () => {
  const { getByText, getByTestId } = render(<App />)
  const button = getByTestId('foulButton');
  fireEvent.click(button);
  const buttonResult = getByText(/Strikes:/i).textContent;
  expect(buttonResult).toBe('Strikes: 2');
  fireEvent.click(button);
  const buttonResult2 = getByText(/Strikes:/i).textContent;
  expect(buttonResult2).toBe('Strikes: 2');
})

it('should reset strike count to zero on the third strike when the strike button is clicked', () => {
  const { getByText, getByTestId } = render(<App />)
  const button = getByTestId('sButton');
  fireEvent.click(button);
  const buttonResult = getByText(/Strikes:/i).textContent;
  expect(buttonResult).toBe('Strikes: 0');
})

it('should reset all values to zero when the hit button is clicked', () => {
  const { getByText, getByTestId } = render(<App />)
  const button = getByTestId('hitButton');
  fireEvent.click(button);
  const strikeResult = getByText(/Strikes:/i).textContent;
  expect(strikeResult).toBe('Strikes: 0');
  const ballsResult = getByText(/Balls:/i).textContent;
  expect(ballsResult).toBe('Balls: 0');
})


