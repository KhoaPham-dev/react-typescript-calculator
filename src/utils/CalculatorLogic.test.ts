import { CalculatorLogic } from './CalculatorLogic';

describe('CalculatorLogic', () => {
  let calculator: CalculatorLogic;

  beforeEach(() => {
    calculator = new CalculatorLogic();
  });

  // AC1 (Digit Input)
  it('should append digits correctly', () => {
    expect(calculator.processInput('digit', '1')).toBe('1');
    expect(calculator.processInput('digit', '2')).toBe('12');
    expect(calculator.processInput('digit', '0')).toBe('120');
  });

  // AC2 (Decimal Input)
  it('should append a decimal point correctly', () => {
    expect(calculator.processInput('digit', '1')).toBe('1');
    expect(calculator.processInput('decimal')).toBe('1.');
    expect(calculator.processInput('digit', '2')).toBe('1.2');
  });

  it('should not append multiple decimal points', () => {
    expect(calculator.processInput('digit', '1')).toBe('1');
    expect(calculator.processInput('decimal')).toBe('1.');
    expect(calculator.processInput('decimal')).toBe('1.');
  });

  it('should start with 0. when decimal is pressed first', () => {
    expect(calculator.processInput('decimal')).toBe('0.');
    expect(calculator.processInput('digit', '5')).toBe('0.5');
  });

  // AC3 (Basic Operations) & AC4 (Equals)
  it('should perform addition correctly', () => {
    calculator.processInput('digit', '5');
    calculator.processInput('operator', '+');
    calculator.processInput('digit', '3');
    expect(calculator.processInput('equals')).toBe('8');
  });

  it('should perform subtraction correctly', () => {
    calculator.processInput('digit', '1');
    calculator.processInput('digit', '0');
    calculator.processInput('operator', '-');
    calculator.processInput('digit', '4');
    expect(calculator.processInput('equals')).toBe('6');
  });

  it('should perform multiplication correctly', () => {
    calculator.processInput('digit', '6');
    calculator.processInput('operator', 'x');
    calculator.processInput('digit', '7');
    expect(calculator.processInput('equals')).toBe('42');
  });

  it('should perform division correctly', () => {
    calculator.processInput('digit', '2');
    calculator.processInput('digit', '0');
    calculator.processInput('operator', '/');
    calculator.processInput('digit', '4');
    expect(calculator.processInput('equals')).toBe('5');
  });

  // AC5 (Clear)
  it('should clear the display and reset state', () => {
    calculator.processInput('digit', '1');
    calculator.processInput('operator', '+');
    calculator.processInput('digit', '2');
    expect(calculator.processInput('clear')).toBe('0');
    expect(calculator.processInput('digit', '5')).toBe('5'); // Ensure new calculation can start
  });

  // AC6 (Division by Zero)
  it('should handle division by zero', () => {
    calculator.processInput('digit', '5');
    calculator.processInput('operator', '/');
    calculator.processInput('digit', '0');
    expect(calculator.processInput('equals')).toBe('Error');
  });

  it('should prevent further operations after division by zero error until cleared', () => {
    calculator.processInput('digit', '5');
    calculator.processInput('operator', '/');
    calculator.processInput('digit', '0');
    calculator.processInput('equals'); // Should result in Error
    expect(calculator.processInput('digit', '1')).toBe('Error');
    expect(calculator.processInput('operator', '+')).toBe('Error');
    expect(calculator.processInput('clear')).toBe('0'); // Clear should reset it
    expect(calculator.processInput('digit', '1')).toBe('1'); // Can start new calculation
  });

  // AC7 (Chained Operations)
  it('should handle chained operations (left-to-right)', () => {
    calculator.processInput('digit', '5');
    calculator.processInput('operator', '+');
    calculator.processInput('digit', '3');
    // 5 + 3 = 8
    expect(calculator.processInput('operator', '-')).toBe('8'); // Display should show intermediate result 8
    calculator.processInput('digit', '2');
    // 8 - 2 = 6
    expect(calculator.processInput('equals')).toBe('6');
  });

  it('should handle chained operations with different operators', () => {
    calculator.processInput('digit', '1');
    calculator.processInput('digit', '0'); // 10
    calculator.processInput('operator', '/');
    calculator.processInput('digit', '2'); // 10 / 2 = 5
    expect(calculator.processInput('operator', 'x')).toBe('5'); // Display 5
    calculator.processInput('digit', '3'); // 5 * 3 = 15
    expect(calculator.processInput('equals')).toBe('15');
  });

  // AC8 (Result Reuse)
  it('should reuse the result of a calculation for the next operation', () => {
    calculator.processInput('digit', '2');
    calculator.processInput('operator', '+');
    calculator.processInput('digit', '2');
    expect(calculator.processInput('equals')).toBe('4');
    // After 2 + 2 = 4, now press + 5 =
    calculator.processInput('operator', '+');
    calculator.processInput('digit', '5');
    expect(calculator.processInput('equals')).toBe('9');
  });

  it('should correctly handle multiple chained operations with result reuse', () => {
    // 10 + 5 = 15
    calculator.processInput('digit', '1');
    calculator.processInput('digit', '0');
    calculator.processInput('operator', '+');
    calculator.processInput('digit', '5');
    expect(calculator.processInput('equals')).toBe('15');

    // 15 - 3 = 12
    calculator.processInput('operator', '-');
    calculator.processInput('digit', '3');
    expect(calculator.processInput('equals')).toBe('12');

    // 12 x 2 = 24
    calculator.processInput('operator', 'x');
    calculator.processInput('digit', '2');
    expect(calculator.processInput('equals')).toBe('24');
  });

  it('should reset current operand after operator if new digit is pressed', () => {
    calculator.processInput('digit', '1');
    calculator.processInput('operator', '+');
    expect(calculator.processInput('digit', '5')).toBe('5'); // new current operand
  });

  it('should correctly handle consecutive operators (last one takes precedence)', () => {
    calculator.processInput('digit', '1');
    calculator.processInput('operator', '+');
    calculator.processInput('operator', '-'); // should override +
    calculator.processInput('digit', '5');
    expect(calculator.processInput('equals')).toBe('-4'); // 0 - 5 = -5, but 1 - 5 = -4
    // The logic is 1 (previous) - 5 (current) = -4
  });
});