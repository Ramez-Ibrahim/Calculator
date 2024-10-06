import React, { useEffect, useState } from 'react';
import useCalculator from './Calculator';
import './styles.css';

function App() {
  const {
    current,
    previous,
    clear,
    deleteLast,
    appendNumber,
    chooseOperation,
    compute,
    toggleSign,
    appendSpecial,
  } = useCalculator();

  const [icon, setIcon] = useState('science');
  const [showAdditional, setShowAdditional] = useState(false);

  const handleIconClick = () => {
    setShowAdditional((prevShow) => !prevShow);
    setIcon((prevIcon) => (prevIcon === 'science' ? 'calculate' : 'science'));
  };

  const handleButtonClick = (value) => {
    if (['+', '-', 'x', '÷', '%'].includes(value)) {
      chooseOperation(value);
    } else if (value === '=') {
      compute();
    } else if (value === 'AC') {
      clear();
    } else if (value === '+/-') {
      toggleSign();
    } else if (value === 'Backspace') {
      deleteLast();
    } else if (value === 'π' || value === '1/x' || value === '√' || value === 'x²' || value === "x³" || value === "e" || value === "x!" || value === "log" || value === "In" || value === "xʸ" || value === "10ˣ" || value === "sin" || value === "cos" || value === "tan" || value === "sin⁻¹" || value === "cos⁻¹" || value === "tan⁻¹" || value === "EE" || value === "(" || value === ")") {
      appendSpecial(value);
    } else {
      appendNumber(value);
    }
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if (key >= '0' && key <= '9') {
      handleButtonClick(key);
    } else if (key === '.') {
      handleButtonClick('.');
    } else if (key === 'Backspace') {
      handleButtonClick('Backspace');
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      handleButtonClick('=');
    } else if (key === 'Escape') {
      handleButtonClick('AC');
    } else if (key === '+') {
      handleButtonClick('+');
    } else if (key === '-') {
      handleButtonClick('-');
    } else if (key === '*' || key === 'x') {
      handleButtonClick('x');
    } else if (key === '/') {
      handleButtonClick('÷');
    } else if (key === '%') {
      handleButtonClick('%');
    } else if (key === 'n') {
      handleButtonClick('+/-');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const formatNumber = (number) => {
    if (number === '' || number === 'Zero Error' || isNaN(number)) return number;
    const [integer, decimal] = number.toString().split('.');
    const formattedInteger = new Intl.NumberFormat().format(integer);
    return decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;
  };

  const mainButtons = [
    { label: 'AC', className: 'accent2' },
    { label: '+/-', className: 'accent2' },
    { label: '%', className: 'accent2' },
    { label: '÷', className: 'accent1' },
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: 'x', className: 'accent1' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '-', className: 'accent1' },
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '+', className: 'accent1' },
    { label: '0', className: 'span-two' },
    { label: '.' },
    { label: '=', className: 'accent1' },
  ];

  const additionalButtons = [
    '(', ')', 'x²', 'x³', '10ˣ', '1/x', '√', 'In', 'log', 'x!', 'π', 'xʸ', 'sin', 'cos', 'tan', 'e', 'sin⁻¹', 'cos⁻¹', 'tan⁻¹', 'EE' 
  ];

  return (
    <div className="calculator-grid">
      <div className="output">
        <span className="material-symbols-outlined icon" onClick={handleIconClick}>
          {icon}
        </span>
        <div className="previous-operand">{formatNumber(previous)}</div>
        <div className="current-operand">{formatNumber(current)}</div>
      </div>
      {showAdditional
        ? additionalButtons.map((btn, index) => (
            <button
              key={index}
              className="additional-button"
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))
        : mainButtons.map((btn, index) => (
            <button
              key={index}
              className={btn.className || ''}
              onClick={() => handleButtonClick(btn.label)}
            >
              {btn.label}
            </button>
          ))}
    </div>
  );
}

export default App;