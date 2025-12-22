
import { validateRequired, validateLength } from './general';
import { getPlayer } from '@/utils/helpers';

export const validateUsername = (value, fieldName = 'Username') => {
  const minLength = 4;
  const maxLength = 10;

  const basicErrors = validateRequired(value, fieldName) || validateLength(value, minLength, maxLength, fieldName);
  if (basicErrors) return basicErrors;

  const playerExists = getPlayer(value)?.id;

  if (value.includes(' ')) {
    return `${fieldName} cannot contain spaces`;
  }

  if (playerExists) return `${fieldName} already exists`;

  return '';
};

export const validatePassword = (
  value, 
  fieldName = 'Password',
  options = {}
) => {
  const {
    minLength = 4,
    maxLength = 16,
    requireUppercase = false,
    requireLowercase = false,
    requireNumbers = false,
    requireSpecialChars = false,
    allowSpaces = false,
  } = options;

  
  const basicErrors = validateRequired(value, fieldName) ||
    validateLength(value, minLength, maxLength, fieldName);

  if (basicErrors) return basicErrors;
  
  if (requireUppercase && !/[A-Z]/.test(value)) {
    return `${fieldName} must contain at least one uppercase letter`;
  }
  
  if (requireLowercase && !/[a-z]/.test(value)) {
    return `${fieldName} must contain at least one lowercase letter`;
  }
  
  if (requireNumbers && !/\d/.test(value)) {
    return `${fieldName} must contain at least one number`;
  }
  
  if (requireSpecialChars && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
    return `${fieldName} must contain at least one special character`;
  }
  
  if (!allowSpaces && /\s/.test(value)) {
    return `${fieldName} cannot contain spaces`;
  }
  
  return '';
};
