import React from 'react';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Typography, InputAdornment, InputLabel, Input, Button, withStyles } from '@material-ui/core';

const styles = theme => ({
  container: {
    width: '70%',
    height: 'auto',
    padding: theme.spacing(3),
    backgroundColor: fade('#ffffff', 0.8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 30,
    '& > *': {
      margin: theme.spacing(1),
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

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
      <div className={classes.container}>
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
      </div>
    );
  }
}

export default withStyles(styles)(BudgetForm);