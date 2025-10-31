import './TextInput.css';

const TextInput = ({ onChange, disabled = false, className, children }) => {
  const handleChange = (e) => {
    onChange && onChange(e.target.value);
  }

  return (
    <input
      name="text-input"
      type="text"
      value={children}
      disabled={disabled}
      className={`text-input__field ${className}`}
      aria-label="Text value"
      tabIndex={-1}
      onChange={handleChange}
    />
  )
}

export default TextInput;
