import { render, screen, fireEvent } from '@testing-library/react';
import Keypad from './Keypad';
import React from 'react';
import '@testing-library/jest-dom';

describe('Keypad', () => {
  const mockOnInput = jest.fn();

  beforeEach(() => {
    mockOnInput.mockClear();
  });

  it('renders all digit buttons', () => {
    render(<Keypad onInput={mockOnInput} />);
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(digit => {
      expect(screen.getByText(digit)).toBeInTheDocument();
    });
  });

  it('renders all operator buttons', () => {
    render(<Keypad onInput={mockOnInput} />);
    ['/', 'x', '-', '+'].forEach(operator => {
      expect(screen.getByText(operator)).toBeInTheDocument();
    });
  });

  it('renders clear, decimal, and equals buttons', () => {
    render(<Keypad onInput={mockOnInput} />);
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('.')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  it('calls onInput with correct type and value for digit click', () => {
    render(<Keypad onInput={mockOnInput} />);
    fireEvent.click(screen.getByText('7'));
    expect(mockOnInput).toHaveBeenCalledWith('digit', '7');
  });

  it('calls onInput with correct type and value for operator click', () => {
    render(<Keypad onInput={mockOnInput} />);
    fireEvent.click(screen.getByText('+'));
    expect(mockOnInput).toHaveBeenCalledWith('operator', '+');
  });

  it('calls onInput with correct type for clear click', () => {
    render(<Keypad onInput={mockOnInput} />);
    fireEvent.click(screen.getByText('C'));
    expect(mockOnInput).toHaveBeenCalledWith('clear', 'C');
  });

  it('calls onInput with correct type for decimal click', () => {
    render(<Keypad onInput={mockOnInput} />);
    fireEvent.click(screen.getByText('.'));
    expect(mockOnInput).toHaveBeenCalledWith('decimal', '.');
  });

  it('calls onInput with correct type for equals click', () => {
    render(<Keypad onInput={mockOnInput} />);
    fireEvent.click(screen.getByText('='));
    expect(mockOnInput).toHaveBeenCalledWith('equals', '=');
  });
});