import React from 'react';
import _ from 'lodash';
import { Tooltip, Typography, Button, withStyles } from '@material-ui/core';
import PriceRange from '../util/price-range';
import currency from '../util/currency';
import MultiCarousel from './MultiCarousel';
import OptionsList from './OptionsList';
import Option from './Option';
import ContentArea from './ContentArea';

const styles = {
  carouselContainer: {
    width: '100%'
  }
};

class BudgetCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // each property on SelectedItems corresponds to an Item Type.
      // Its value corresponds to an item of that type, or null.
      selectedItems: this.itemTypes.reduce((o, t) => {
        o[t.name] = null;
        return o;
      }, {})
    };
  }

  get itemTypes() {
    // get an array of unique item types based on items supplied to props
    let types = this.props.items.map(i => i.type);
    return _.uniqBy(types, t => t.name);
  };

  get selectedItemsPriceRange() {
    const selectedItems = _.compact(Object.values(this.state.selectedItems));
    return PriceRange.fromItems(selectedItems);
  }

  renderItemsLists = () => {
    // each list of items corresponds to its members' unique item type.
    return this.itemTypes.map((t, idx) => {
      let items = this.props.items.filter(i => i.type.name == t.name);
      items = _.sortBy(items, i => i.priceRange.lo);

      return (
        <OptionsList key={t.name} title={t.prettyPrint()}>
          {items.map(i => (
            <Tooltip title={i.priceRange.toString()} arrow key={i.name}>
              <div> {/* This div required for tooltip to render */}
                <Option 
                  value={i.name} 
                  selected={this.state.selectedItems[t.name] === i}
                  onClick={this.handleUpdateSelectedItems(t, i)}
                />
              </div>
            </Tooltip>
          ))}
        </OptionsList>
      );
    });
  };

  handleUpdateSelectedItems = (itemType, item) => () => {
    const nextSelectedItems = { ...this.state.selectedItems };

    if (this.state.selectedItems[itemType.name] === item) {
      nextSelectedItems[itemType.name] = null;
    } else {
      nextSelectedItems[itemType.name] = item;
    }

    this.setState({ selectedItems: nextSelectedItems })
  };

  render() {
    const { classes, budget, onSubmit } = this.props;

    return (
      <ContentArea width="80%">
        <Typography variant="h4" align="center">
          Let your imagination run wild.
        </Typography>
        <Typography variant="subtitle1" align="center">
          Choose up to one item from each category.
        </Typography>
        <div className={classes.carouselContainer}>
          <MultiCarousel 
            columns={3} 
            autoPlay={false} 
            animation="slide" 
            navButtonsAlwaysVisible
          > 
            {this.renderItemsLists()}
          </MultiCarousel>
        </div>
        <div>
          <Typography variant="subtitle1" align="center">
            Your budget: {currency.usd(budget)}
          </Typography>
          <Typography 
            variant="subtitle1" 
            align="center" 
            color={(
              this.selectedItemsPriceRange.lo > budget ? 'error' : 'inherit'
            )}
          >
            Estimated cost: {this.selectedItemsPriceRange.toString()}
          </Typography>
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onSubmit} 
          size="large"
        >
          Submit
        </Button>
      </ContentArea>
    );
  }
}

export default withStyles(styles)(BudgetCalculator);