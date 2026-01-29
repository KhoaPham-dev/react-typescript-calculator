export class CalculatorLogic {
  private currentOperand: string;
  private previousOperand: string | null;
  private operator: string | null;
  private waitingForNewOperand: boolean;
  private hasError: boolean;

  constructor() {
    this.currentOperand = '0';
    this.previousOperand = null;
    this.operator = null;
    this.waitingForNewOperand = false;
    this.hasError = false;
  }

  private clear() {
    this.currentOperand = '0';
    this.previousOperand = null;
    this.operator = null;
    this.waitingForNewOperand = false;
    this.hasError = false;
  }

  private appendDigit(digit: string): string {
    if (this.hasError) {
      return this.currentOperand;
    }
    if (this.currentOperand === '0' || this.waitingForNewOperand) {
      this.currentOperand = digit;
      this.waitingForNewOperand = false;
    } else {
      this.currentOperand += digit;
    }
    return this.currentOperand;
  }

  private appendDecimal(): string {
    if (this.hasError) {
      return this.currentOperand;
    }
    if (this.currentOperand === '0' || this.waitingForNewOperand) {
      this.currentOperand = '0.';
      this.waitingForNewOperand = false;
    } else if (!this.currentOperand.includes('.')) {
      this.currentOperand += '.';
    }
    return this.currentOperand;
  }

  private performOperation(nextOperator: string): string {
    if (this.hasError) {
      return this.currentOperand;
    }

    const inputValue = parseFloat(this.currentOperand);

    if (this.previousOperand === null) {
      this.previousOperand = this.currentOperand;
    } else if (this.operator) {
      const previousValue = parseFloat(this.previousOperand);
      let result: number;

      switch (this.operator) {
        case '+':
          result = previousValue + inputValue;
          break;
        case '-':
          result = previousValue - inputValue;
          break;
        case 'x':
          result = previousValue * inputValue;
          break;
        case '/':
          if (inputValue === 0) {
            this.hasError = true;
            return "Error";
          }
          result = previousValue / inputValue;
          break;
        default:
          return this.currentOperand;
      }
      this.currentOperand = result.toString();
      this.previousOperand = this.currentOperand; // For chained operations
    }
    this.waitingForNewOperand = true;
    this.operator = nextOperator;
    return this.currentOperand;
  }

  private calculateResult(): string {
    if (this.hasError) {
      return this.currentOperand;
    }
    if (this.previousOperand === null || this.operator === null) {
      return this.currentOperand;
    }

    const previousValue = parseFloat(this.previousOperand);
    const inputValue = parseFloat(this.currentOperand);
    let result: number;

    switch (this.operator) {
      case '+':
        result = previousValue + inputValue;
        break;
      case '-':
        result = previousValue - inputValue;
        break;
      case 'x':
        result = previousValue * inputValue;
        break;
      case '/':
        if (inputValue === 0) {
          this.hasError = true;
          return "Error";
        }
        result = previousValue / inputValue;
        break;
      default:
        return this.currentOperand;
    }

    this.currentOperand = result.toString();
    this.previousOperand = null;
    this.operator = null;
    this.waitingForNewOperand = true;
    return this.currentOperand;
  }

  public processInput(type: 'digit' | 'operator' | 'decimal' | 'equals' | 'clear', value?: string): string {
    if (this.hasError && type !== 'clear') {
      return "Error";
    }

    switch (type) {
      case 'digit':
        return this.appendDigit(value!);
      case 'decimal':
        return this.appendDecimal();
      case 'operator':
        return this.performOperation(value!);
      case 'equals':
        return this.calculateResult();
      case 'clear':
        this.clear();
        return this.currentOperand;
      default:
        return this.currentOperand;
    }
  }
}