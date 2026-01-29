import React from 'react';
import Button from '../Button/Button';
import styles from './Keypad.module.css';

interface KeypadProps {
  onInput: (type: 'digit' | 'operator' | 'decimal' | 'equals' | 'clear', value?: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onInput }) => {
  const buttons = [
    { label: 'C', type: 'clear' },
    { label: '/', type: 'operator' },
    { label: 'x', type: 'operator' },
    { label: '-', type: 'operator' },
    { label: '7', type: 'digit' },
    { label: '8', type: 'digit' },
    { label: '9', type: 'digit' },
    { label: '+', type: 'operator' },
    { label: '4', type: 'digit' },
    { label: '5', type: 'digit' },
    { label: '6', type: 'digit' },
    { label: '=', type: 'equals' }, // This spans two rows/columns potentially
    { label: '1', type: 'digit' },
    { label: '2', type: 'digit' },
    { label: '3', type: 'digit' },
    { label: '0', type: 'digit' },
    { label: '.', type: 'decimal' },
  ];

  const handleButtonClick = (label: string, type: 'digit' | 'operator' | 'decimal' | 'equals' | 'clear') => {
    onInput(type, label);
  };

  return (
    <div className={styles.keypad}>
      {buttons.map((button) => (
        <Button
          key={button.label}
          label={button.label}
          onClick={() => handleButtonClick(button.label, button.type)}
          type={button.type}
        />
      ))}
    </div>
  );
};

export default Keypad;