import { useState } from 'react';

function useCalculator() {
  const [current, setCurrent] = useState('');
  const [previous, setPrevious] = useState('');
  const [operation, setOperation] = useState('');

  const clear = () => {
    setCurrent('');
    setPrevious('');
    setOperation('');
  };

  const deleteLast = () => {
    setCurrent(current.slice(0, -1));
  };

  const appendNumber = (number) => {
    if (operation && previous && current === '') {
      setCurrent(number);
    } else {
      if (number === '.' && current.includes('.')) return;
      if (number === '.' && current === '') {
        setCurrent('0.');
      } else {
        setCurrent(current + number);
      }
    }
  };

  const chooseOperation = (op) => {
    if (current === '') return;
    if (op === '%') {
      const curr = parseFloat(current);
      if (isNaN(curr)) return;
      const result = (curr / 100).toString();
      setPrevious(`${current} %`);
      setCurrent(result);
      setOperation('');
      return;
    }
    if (previous !== '') {
      setCurrent(previous + ' ' + current + ' ' + op);
    } else {
      setCurrent(current + ' ' + op);
    }
    setPrevious('');
    setOperation(op);
  };
  

  const compute = () => {
    try {
      // Add spacing around operators in the current expression if needed
      let expression = current
        .replace(/x/g, ' * ')
        .replace(/÷/g, ' / ')
        .replace(/\^/g, ' ** ')
        .replace(/\s+/g, ' ') // Normalize multiple spaces
        .trim();
      
      if (operation === 'xʸ') {
        // Handle xʸ operation
        const base = parseFloat(previous);
        const exponent = parseFloat(current);
        if (!isNaN(base) && !isNaN(exponent)) {
          const result = Math.pow(base, exponent);
          setCurrent(result.toString());
          setPrevious('');
          setOperation('');
        } else {
          setCurrent('Invalid Input');
        }
      } else {
        // Evaluate the full expression
        const result = eval(expression);
        setCurrent(result.toString());
      }
    } catch (error) {
      setCurrent('Error');
    }
  };
  
  
  
  const toggleSign = () => {
    setCurrent((prev) => (prev.charAt(0) === '-' ? prev.slice(1) : '-' + prev));
  };

  const appendSpecial = (special) => {
    switch (special) {
      case 'π':
        if (current === '') {
          setCurrent('Math.PI');
        } else {
          const curr = parseFloat(current);
          if (!isNaN(curr)) {
            const result = (curr * Math.PI).toFixed(10);
            setPrevious(`${current} * π`);
            setCurrent(result.toString());
          }
        }
        break;
      case '1/x': {
        const value = parseFloat(current);
        if (!isNaN(value) && value !== 0) {
          let result = (1 / value).toPrecision(11);
          if (Math.abs(1 / value) < 1e-6) {
            result = (1 / value).toExponential(11);
          } else {
            result = parseFloat(result).toString();
          }
          if (result.includes('.')) {
            const [integerPart, decimalPart] = result.split('.');
            result = `${integerPart}.${decimalPart.slice(0, 11)}`;
          }
          setPrevious(`1 / ${current}`);
          setCurrent(result);
        } else if (value === 0) {
          setCurrent('Zero Error');
        }
        break;
      }
      case '√': {
        const num = parseFloat(current);
        if (!isNaN(num) && num >= 0) {
          let result = Math.sqrt(num).toPrecision(11);
          result = parseFloat(result).toString();
          if (result.includes('.')) {
            const [integerPart, decimalPart] = result.split('.');
            result = `${integerPart}.${decimalPart.slice(0, 11)}`;
          }
          setPrevious(`√(${current})`);
          setCurrent(result);
        } else if (num < 0) {
          setCurrent('Invalid Input');
        }
        break;
      }
      case 'x²': {
        const squareNum = parseFloat(current);
        if (!isNaN(squareNum)) {
          let result = Math.pow(squareNum, 2).toPrecision(1);
          result = parseFloat(result).toString();
          if (result.includes('.')) {
            const [integerPart, decimalPart] = result.split('.');
            result = `${integerPart}.${decimalPart.slice(0, 11)}`;
          }
          setPrevious(`${current}^(2)`);
          setCurrent(result);
        }
        break;
      }
      case 'x³': {
        const cubeNum = parseFloat(current);
        if (!isNaN(cubeNum)) {
          let result = Math.pow(cubeNum, 3).toPrecision(11);
          result = parseFloat(result).toString();
          if (result.includes('.')) {
            const [integerPart, decimalPart] = result.split('.');
            result = `${integerPart}.${decimalPart.slice(0, 11)}`;
          }
          setPrevious(`${current}^(3)`);
          setCurrent(result);
        }
        break;
      }
      case 'e':
        if (current === '') {
          setCurrent('Math.E');
        } else {
          const curr = parseFloat(current);
          if (!isNaN(curr)) {
            const result = (curr * Math.E).toFixed(10);
            setPrevious(`${current} * e`);
            setCurrent(result.toString());
          }
        }
        break;
      case 'x!': {
        const factorialNum = parseInt(current);
        if (!isNaN(factorialNum) && factorialNum >= 0) {
          let result = 1;
          for (let i = 1; i <= factorialNum; i++) {
            result *= i;
          }
          setPrevious(`${current}!`);
          setCurrent(result.toString());
        } else {
          setCurrent('Invalid Input');
        }
        break;
      }
      case 'In': {
        const lnNum = parseFloat(current);
        if (!isNaN(lnNum) && lnNum > 0) {
          let result = Math.log(lnNum).toPrecision(11);
          if (parseFloat(result) % 1 === 0) {
            result = parseInt(result).toString();
          }
          setPrevious(`ln(${current})`);
          setCurrent(result);
        } else {
          setCurrent('Invalid Input');
        }
        break;
      }
      case 'log': {
        const logNum = parseFloat(current);
        if (!isNaN(logNum) && logNum > 0) {
          let result = (Math.log(logNum) / Math.log(10)).toPrecision(11);
          if (parseFloat(result) % 1 === 0) {
            result = parseInt(result).toString();
          } else {
            result = parseFloat(result).toString();
          }
          setPrevious(`log(${current})`);
          setCurrent(result);
        } else {
          setCurrent('Invalid Input');
        }
        break;
      }
      case 'xʸ':
        if (current !== '') {
          setPrevious(`${current}^(`);  // Store the base value
          setCurrent('');  // Clear the current value to accept the exponent
          setOperation('xʸ');  // Set the operation to power
        }
        break;
      case '10ˣ': {
        const tenPowerNum = parseFloat(current);
        if (!isNaN(tenPowerNum)) {
          const result = Math.pow(10, tenPowerNum).toString();
          setPrevious(`10^(${current})`);
          setCurrent(result);
        }
        break;
      }        
      case 'sin': {
        const sinNum = parseFloat(current);
        if (!isNaN(sinNum)) {
          const radians = (sinNum * Math.PI) / 180;
          let result = Math.sin(radians).toPrecision(11);
          if (Math.abs(result - Math.round(result)) < 1e-10) {
            result = Math.round(result).toString();
          }
          setPrevious(`sin(${current})`);
          setCurrent(result);
        } else {
          setCurrent('Invalid Input');
        }
        break;
      }
      case 'cos': {
        const cosNum = parseFloat(current);
        if (!isNaN(cosNum)) {
          const radians = (cosNum * Math.PI) / 180;
          let result = Math.cos(radians).toPrecision(11);
          if (Math.abs(result - Math.round(result)) < 1e-10) {
            result = Math.round(result).toString();
          }
          setPrevious(`cos(${current})`);
          setCurrent(result);
        } else {
          setCurrent('Invalid Input');
        }
        break;
      }
      case 'tan': {
        const tanNum = parseFloat(current);
        if (!isNaN(tanNum)) {
          if (tanNum % 180 === 90) {
            setCurrent('Invalid Input');
          } else {
            const radians = (tanNum * Math.PI) / 180;
            let result = Math.tan(radians).toPrecision(11);
            if (Math.abs(result - Math.round(result)) < 1e-10) {
              result = Math.round(result).toString();
            }
            setPrevious(`tan(${current})`);
            setCurrent(result);
          }
        } else {
          setCurrent('Invalid Input');
        }
        break;
      }
      case 'sin⁻¹': {
        const asinNum = parseFloat(current);
        if (!isNaN(asinNum) && asinNum >= -1 && asinNum <= 1) {
          let result = Math.asin(asinNum) * (180 / Math.PI);
          result = parseFloat(result.toFixed(11));
          if (result % 1 === 0) {
            result = result.toFixed(0);
          }
          setPrevious(`sin⁻¹(${current})`);
          setCurrent(result.toString());
        } else {
          setCurrent('Invalid Input');
        }
        break;
      }
      case 'cos⁻¹': {
        const acosNum = parseFloat(current);
        if (!isNaN(acosNum) && acosNum >= -1 && acosNum <= 1) {
          let result = Math.acos(acosNum) * (180 / Math.PI);
          result = parseFloat(result.toFixed(11));
          if (result % 1 === 0) {
            result = result.toFixed(0);
          }
          setPrevious(`cos⁻¹(${current})`);
          setCurrent(result.toString());
        } else {
          setCurrent('Invalid Input');
        }
        break;
      }
      case 'tan⁻¹': {
        const atanNum = parseFloat(current);
        if (!isNaN(atanNum)) {
          let result = Math.atan(atanNum) * (180 / Math.PI);
          result = parseFloat(result.toFixed(11));
          if (result % 1 === 0) {
            result = result.toFixed(0);
          }
          setPrevious(`tan⁻¹(${current})`);
          setCurrent(result.toString());
        } else {
          setCurrent('Invalid Input');
        }
        break;
      }
      case 'EE':
        if (current !== '') {
          setPrevious(`${current} * 10^(`);
          setCurrent('');
          setOperation('EE');
        }
        break;
      case '(':
        setCurrent(current + special);
        break;
      case ')':
        setCurrent(current + ')');
        break;
      default:
        break;
    }
  };

  return {
    current,
    previous,
    clear,
    deleteLast,
    appendNumber,
    chooseOperation,
    compute,
    toggleSign,
    appendSpecial,
  };
}

export default useCalculator;