// Calculator.js
import { useState, useEffect } from 'react';

const useCalculator = () => {
  const [currentOperand, setCurrentOperand] = useState("");
  const [previousOperand, setPreviousOperand] = useState("");
  const [operation, setOperation] = useState(null);

  const clear = () => {
    setCurrentOperand("");
    setPreviousOperand("");
    setOperation(null);
  };

  const deleteLast = () => {
    setCurrentOperand(currentOperand.toString().slice(0, -1));
  };

  const appendNumber = (number) => {
    if (number === "." && currentOperand.includes(".")) return;
    setCurrentOperand(currentOperand + number);
  };

  const chooseOperation = (op) => {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
      compute();
    }
    setOperation(op);
    setPreviousOperand(currentOperand);
    setCurrentOperand("");
  };

  const compute = () => {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    let computation;
    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    setCurrentOperand(computation.toString());
    setOperation(null);
    setPreviousOperand("");
  };

  const getDisplayNumber = (number) => {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  };

  const updateDisplay = () => {
    const current = getDisplayNumber(currentOperand);
    const previous = operation ? `${getDisplayNumber(previousOperand)} ${operation}` : "";
    return { current, previous };
  };

  const { current, previous } = updateDisplay();

  return {
    current,
    previous,
    clear,
    deleteLast,
    appendNumber,
    chooseOperation,
    compute,
  };
};

export default useCalculator;
