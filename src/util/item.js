import ItemType from './item-type';
import PriceRange from './price-range';

class Item {
  constructor(options) {
    this.name = options.name;
    this.type = new ItemType(options.type);
    this.priceRange = new PriceRange(
      // convert lowPrice and highPrice from cents to dollars
      options.lowPrice / 100.0, options.highPrice / 100.0 
    );
  }
}

export default Item;