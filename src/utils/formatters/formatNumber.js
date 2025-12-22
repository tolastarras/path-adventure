const formatNumber = (number, options = {}) => {
  const { decimals = 0, locale = 'en-US' } = options;
  
  return number.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

export default formatNumber;
