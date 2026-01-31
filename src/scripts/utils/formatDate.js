/**
 * Convert date-like input to a human readable string with date and time.
 * Falls back to the original value if parsing fails.
 * @param {string|number|Date} value
 * @return {string}
 */
const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export default formatDate;
