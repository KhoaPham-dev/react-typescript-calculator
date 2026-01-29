import { render, screen } from '@testing-library/react';
import Display from './Display';
import React from 'react';
import '@testing-library/jest-dom';

describe('Display', () => {
  it('renders the correct value', () => {
    render(<Display value="12345" />);
    expect(screen.getByText('12345')).toBeInTheDocument();
  });

  it('renders 0 when value is 0', () => {
    render(<Display value="0" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders long numbers correctly', () => {
    const longNumber = "12345678901234567890";
    render(<Display value={longNumber} />);
    expect(screen.getByText(longNumber)).toBeInTheDocument();
  });

  it('renders error messages', () => {
    render(<Display value="Error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});