import React from 'react';
import _ from 'lodash';
import { Tooltip, Typography, Button, withStyles } from '@material-ui/core';
import PriceRange from '../util/price-range';
import currency from '../util/currency';
import MultiCarousel from './shared/MultiCarousel';
import OptionsList from './shared/OptionsList';
import Option from './shared/Option';
import ContentArea from './shared/ContentArea';

const styles = {
  carouselContainer: {
    width: '100%'
  },
  under: {
    color: 'green'
  },
  over: {
    color: 'red'
  },
  within: {
    color: 'black'
  }
};

class BudgetCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // each property on SelectedItems corresponds to an Item Type.
      // Its value corresponds to an item of that type, or null.
      selectedItemsByType: this.itemTypes.reduce((o, t) => {
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
    return PriceRange.fromItems(this.selectedItems);
  }

  get selectedItems() {
    return _.compact(Object.values(this.state.selectedItemsByType))
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
                  selected={this.state.selectedItemsByType[t.name] === i}
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
    const nextSelectedItemsByType = { ...this.state.selectedItemsByType };

    if (this.state.selectedItemsByType[itemType.name] === item) {
      nextSelectedItemsByType[itemType.name] = null;
    } else {
      nextSelectedItemsByType[itemType.name] = item;
    }

    this.setState({ selectedItemsByType: nextSelectedItemsByType })
  };

  render() {
    const { classes, budget, onSubmit } = this.props;

    let budgetWarningClass =
      this.selectedItemsPriceRange.hi < budget ? 'under' :
      this.selectedItemsPriceRange.lo > budget ? 'over' :
      'within';

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
          <div className={classes[budgetWarningClass]}>
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
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => onSubmit(this.selectedItems)} 
          size="large"
        >
          Submit
        </Button>
      </ContentArea>
    );
  }
}

export default withStyles(styles)(BudgetCalculator);