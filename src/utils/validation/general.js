export const validateRequired = (value, fieldName) => {
  if (!value?.trim()) return `${fieldName} is required`;
  return '';
};

export const validateLength = (value, min, max, fieldName) => {
  if (value.length < min) return `${fieldName} must be at least ${min} characters`;
  else if (value.length > max) return `${fieldName} must be less than ${max} characters`;
  return '';
};
