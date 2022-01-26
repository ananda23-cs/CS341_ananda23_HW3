const sum = require('../public/javascripts/sum.js');
test('adds 1 + 2 to equal 2', () => {
    expect(sum(1,2)).toBe(3);
});