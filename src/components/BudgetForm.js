import React from 'react';
import { Typography, InputAdornment, InputLabel, Input, Button, withStyles } from '@material-ui/core';
import ContentArea from './ContentArea';


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

  handleChange = e => {
    e.preventDefault();
    this.setState({ value: e.currentTarget.value });
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
            <InputLabel htmlFor="budget">Enter your budget:</InputLabel>
            <Input
              id="budget"
              value={this.state.value}
              onChange={this.handleChange}
              size="med"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
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