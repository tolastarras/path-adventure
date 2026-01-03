import { HeaderTitle } from '@/components';
import './TextInput.css';

const TextInput = ({
  label = '',
  name = 'text-input',
  onChange,
  disabled = false,
  className = 'text-blue-200',
  type='text',
  children,
  placeholder = '',
  hasErrorHandler = false,
  error = '',
  ...props
}) => {
  return (
    <>
      {label && <HeaderTitle className="mb-2" size="md" title={label} />}
      <div className={hasErrorHandler ? 'h-15' : ''}>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={children}
          disabled={disabled}
          className={`text-input__field ${className}`}
          aria-label={`${name} input field`}
          tabIndex={-1}
          onChange={onChange}
          tabIndex={disabled ? -1 : 0}
          {...props}
        />
        {error && (
          <p className="mx-1 text-xs text-danger italic">{error}</p>
        )}
      </div>
    </>
  )
}

export default TextInput;
