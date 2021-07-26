const {format_plural, format_dates} = require('../utils/helpers');

test('format_date() returns a date string', () => {
  const date = new Date('2020-03-20 16:12:03');

  expect(format_dates(date)).toBe('3/20/2020');
});

test('returns plurals if amount not one', () => {

  expect(format_plural('Comment', 5)).toBe('Comments');
  expect(format_plural('Post', 1)).toBe('Post');
});