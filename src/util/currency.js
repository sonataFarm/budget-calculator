// Module to transform numbers into currency strings.
// Usage: currency.usd(2500.00); 
// => $2,500.00 

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
}).format;

export default { usd };