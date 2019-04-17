import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";

import Display from './Display';

describe('The Display Component', () => {

  it('should render without crashing', () => {
    render(<Display />);
  })

  it('should display balls', () => {
    const { getByText } = render(<Display />);
    const text = getByText(/balls:/i);
    expect(text).toBeInTheDocument();
  })

  it('should display strikes', () => {
    const { getByText } = render(<Display />);
    const text = getByText(/strikes:/i);
    expect(text).toBeInTheDocument();
  })

  it('should display ball and strike count passed in from props', () => {

    const { getByText } = render(<Display balls={2} strikes={1}/>);

    const balls = getByText(/2/);
    const strikes = getByText(/1/);

    expect(balls).toBeInTheDocument();
    expect(strikes).toBeInTheDocument();
  })
  
})
