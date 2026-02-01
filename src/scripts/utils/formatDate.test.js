import formatDate from './formatDate';

describe('formatDate', () => {
  it('formats ISO string to readable date', () => {
    const result = formatDate('2023-05-01T12:34:00Z');
    expect(result).toContain('May');
    expect(result).toContain('2023');
  });

  it('returns original value for invalid date', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });

  it('returns empty string for falsy input', () => {
    expect(formatDate('')).toBe('');
    expect(formatDate(null)).toBe('');
  });
});
