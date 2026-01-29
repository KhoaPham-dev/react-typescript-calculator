import React, { useState } from 'react';
import styles from './App.module.css';
import Display from './components/Display/Display';
import Keypad from './components/Keypad/Keypad';
import { CalculatorLogic } from './utils/CalculatorLogic';

const calculator = new CalculatorLogic();

function App() {
  const [displayValue, setDisplayValue] = useState<string>('0');

  const handleInput = (type: 'digit' | 'operator' | 'decimal' | 'equals' | 'clear', value?: string) => {
    const newDisplayValue = calculator.processInput(type, value);
    setDisplayValue(newDisplayValue);
  };

  return (
    <div className={styles.calculator}>
      <Display value={displayValue} />
      <Keypad onInput={handleInput} />
    </div>
  );
}

export default App;