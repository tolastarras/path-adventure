import { useState, useRef, useEffect } from 'react';

import './NumberInput.css';

const NumberInput = ({ onChange, resetInput = false }) => {
  const inputRef = useRef(null);
  const [count, setCount] = useState(1);

  // Reset when resetInput prop changes
  useEffect(() => {
    if (resetInput) {
      setCount(1);
      if (inputRef.current) {
        inputRef.current.value = 1;
      }
    }
  }, [resetInput]);

  const handleInputChange = (value) => {
    setCount(value);
    onChange && onChange(Number(value));
  }

  const handleIncrement = () => {
    inputRef.current?.stepUp();
    const newValue = inputRef.current?.value;
    handleInputChange(newValue);
  };

  const handleDecrement = () => {
    inputRef.current?.stepDown();
    const newValue = inputRef.current?.value;
    handleInputChange(newValue);
  };

  return (
    <div className="number-input-container">
      <button
        className="number-input__button"
        onClick={handleDecrement}
        type="button"
        aria-label="Decrease count"
      >
        -
      </button>
      
      <input
        ref={inputRef}
        name="number-input"
        type="number"
        value={count}
        readOnly
        className="number-input__field"
        min="1"
        max="100"
        aria-label="Counter value"
        tabIndex={-1} 
      />

      <button
        className="number-input__button"
        onClick={handleIncrement}
        type="button"
        aria-label="Increase count"
      >
        +
      </button>
    </div>
  )
}

export default NumberInput;
