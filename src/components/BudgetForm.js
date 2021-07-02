import React from 'react';
import { Typography, InputAdornment, InputLabel, Input, Button, withStyles } from '@material-ui/core';
import ContentArea from './shared/ContentArea';
import CurrencyInput from './shared/CurrencyInput';

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

class BudgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const { classes, onSubmit } = this.props;

    return (
      <ContentArea width="70%">
        <Typography variant="h4" align="center" gutterBottom>
          Every dream yard starts with a budget.
        </Typography>
        <div className={classes.form}>
          <div>
            <CurrencyInput
              value={this.state.value}
              label="Enter your budget:"
              onChange={this.handleChange}
            />
          </div>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => onSubmit(this.state.value)}
            size="medium"
          >
            Next
          </Button>
        </div>
      </ContentArea>
    );
  }
}

export default withStyles(styles)(BudgetForm);