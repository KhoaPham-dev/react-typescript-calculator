import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import React from 'react';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('renders the button with the correct label', () => {
    render(<Button label="5" onClick={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls the onClick handler with the label when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="+" onClick={handleClick} />);
    fireEvent.click(screen.getByText('+'));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith('+');
  });

  it('applies the correct CSS class for digit type', () => {
    render(<Button label="1" onClick={() => {}} type="digit" />);
    expect(screen.getByText('1')).toHaveClass('digit');
  });

  it('applies the correct CSS class for operator type', () => {
    render(<Button label="x" onClick={() => {}} type="operator" />);
    expect(screen.getByText('x')).toHaveClass('operator');
  });

  it('applies the correct CSS class for clear type', () => {
    render(<Button label="C" onClick={() => {}} type="clear" />);
    expect(screen.getByText('C')).toHaveClass('clear');
  });

  it('applies the correct CSS class for equals type', () => {
    render(<Button label="=" onClick={() => {}} type="equals" />);
    expect(screen.getByText('=')).toHaveClass('equals');
  });

  it('applies the correct CSS class for decimal type', () => {
    render(<Button label="." onClick={() => {}} type="decimal" />);
    expect(screen.getByText('.')).toHaveClass('decimal');
  });
});