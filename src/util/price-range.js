import currency from './currency';

class PriceRange {
  static fromItems(items) {
    const 
      lo = items.reduce((sum, i) => sum + i.priceRange.lo, 0),
      hi = items.reduce((sum, i) => sum + i.priceRange.hi, 0);
    
    return new PriceRange(lo, hi);
  }
  
  constructor(lo, hi) {
    // lo, hi are floats representing USD
    this.lo = lo;
    this.hi = hi;
  }

  toString() {
    if (this.lo === this.hi) {
      return currency.usd(this.lo);
    } else {
      return `${currency.usd(this.lo)} - ${currency.usd(this.hi)}`;
    }
  }
}

export default PriceRange;