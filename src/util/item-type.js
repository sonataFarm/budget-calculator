import _ from 'lodash';

class ItemType {
  constructor(name) {
    this.name = name;
  }

  prettyPrint() {
    return _.startCase(_.toLower(this.name));
  }
}

export default ItemType;