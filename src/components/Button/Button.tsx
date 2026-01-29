import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  onClick: (value: string) => void;
  type?: 'digit' | 'operator' | 'clear' | 'equals' | 'decimal';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type }) => {
  const buttonClass = type ? styles[type] : '';
  return (
    <button className={`${styles.button} ${buttonClass}`} onClick={() => onClick(label)}>
      {label}
    </button>
  );
};

export default Button;