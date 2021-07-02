import React from 'react';
import _ from 'lodash';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Tooltip, Typography, Button, withStyles } from '@material-ui/core';
import PriceRange from '../util/price-range';
import currency from '../util/currency';
import MultiCarousel from './MultiCarousel';
import OptionsList from './OptionsList';
import Option from './Option';

const styles = theme => ({
  container: {
    width: '80%',
    height: 'auto',
    padding: theme.spacing(3),
    backgroundColor: fade('#ffffff', 0.8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 30,
    '& > *': {
      margin: theme.spacing(1),
    },
    '& > div:nth-of-type(1)': {
      width: '92%' // resize MultiCarousel the hacky way :/
    } 
  },
  budget: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class BudgetCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // each Array index corresponds to an Item Type.
      // its value corresponds to an item of that type or null.
      selectedItems: new Array(this.itemTypes.length).fill(null)
    };
  }

  get itemTypes() {
    // get an array of unique item types based on items supplied to props
    let types = this.props.items.map(i => i.type);
    return _.uniqBy(types, t => t.name);
  };

  get selectedItemsPriceRange() {
    const selectedItems = this.props.items.filter(
      i => this.state.selectedItems.includes(i.name)
    );

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
                  selected={this.state.selectedItems[idx] === i.name}
                  onClick={this.handleUpdateSelectedItems(idx, i.name)}
                />
              </div>
            </Tooltip>
          ))}
        </OptionsList>
      );
    });
  };

  handleUpdateSelectedItems = (itemTypeIdx, itemName) => () => {
    const nextSelectedItems = [ ...this.state.selectedItems ];

    if (this.state.selectedItems[itemTypeIdx] === itemName) {
      nextSelectedItems[itemTypeIdx] = null;
    } else {
      nextSelectedItems[itemTypeIdx] = itemName;
    }

    this.setState({ selectedItems: nextSelectedItems })
  };

  render() {
    const { classes, budget, onSubmit } = this.props;

    return (
      <div className={classes.container}>
        <Typography variant="h4" align="center">
          Let your imagination run wild.
        </Typography>
        <Typography variant="subtitle1" align="center">
          Choose up to one item from each category.
        </Typography>
        <MultiCarousel 
          columns={3} 
          autoPlay={false} 
          animation="slide" 
          navButtonsAlwaysVisible
        > 
          {this.renderItemsLists()}
        </MultiCarousel>
        <div className={classes.budgets}>
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
      </div>
    );
  }
}

export default withStyles(styles)(BudgetCalculator);