import React, { useRef, useEffect } from 'react';
import useCalculator from './Calculator';
import './styles.css'; // Ensure this path is correct based on your file structure

function App() {
  const {
    current,
    previous,
    clear,
    deleteLast,
    appendNumber,
    chooseOperation,
    compute,
  } = useCalculator();

  const previousOperandRef = useRef(null);
  const currentOperandRef = useRef(null);

  useEffect(() => {
    if (previousOperandRef.current) {
      previousOperandRef.current.innerText = previous;
    }
    if (currentOperandRef.current) {
      currentOperandRef.current.innerText = current;
    }
  }, [current, previous]);

  return (
    <div className="calculator-grid">
      <div className="output">
        <div data-previous-operand ref={previousOperandRef} className="previous-operand"></div>
        <div data-current-operand ref={currentOperandRef} className="current-operand"></div>
      </div>
      <button className="span-two" onClick={clear}>AC</button>
      <button onClick={deleteLast}>DEL</button>
      <button onClick={() => chooseOperation("÷")}>÷</button>
      <button onClick={() => appendNumber("1")}>1</button>
      <button onClick={() => appendNumber("2")}>2</button>
      <button onClick={() => appendNumber("3")}>3</button>
      <button onClick={() => chooseOperation("*")}>*</button>
      <button onClick={() => appendNumber("4")}>4</button>
      <button onClick={() => appendNumber("5")}>5</button>
      <button onClick={() => appendNumber("6")}>6</button>
      <button onClick={() => chooseOperation("+")}>+</button>
      <button onClick={() => appendNumber("7")}>7</button>
      <button onClick={() => appendNumber("8")}>8</button>
      <button onClick={() => appendNumber("9")}>9</button>
      <button onClick={() => chooseOperation("-")}>-</button>
      <button onClick={() => appendNumber(".")}>.</button>
      <button onClick={() => appendNumber("0")}>0</button>
      <button className="span-two" onClick={compute}>=</button>
    </div>
  );
}

export default App;
