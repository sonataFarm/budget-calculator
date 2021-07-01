import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import db from '../util/db';
import Background from '../images/background.png'
import WelcomeScreen from './WelcomeScreen';
import BudgetCalculator from './BudgetCalculator';
import { Button } from '@material-ui/core';

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], budget: undefined };
  }

  componentDidMount() {
    this.fetchAndSetItems();
  }

  fetchAndSetItems = async () => {
    const items = await db.fetchCollection('items');
    this.setState({ items });
  };

  setBudget = (budget) => {
    this.setState({ budget });
  };

  handleSubmit = () => {
    console.log(this.state.budget);
    console.log(this.state.items);
  };

  render() {
    const { budget, items } = this.state;
    const { classes } = this.props; 

    const component = (!budget ?
      <WelcomeScreen onNext={this.setBudget} /> :
      <BudgetCalculator 
        budget={budget} 
        items={items} 
        onSubmit={this.handleSubmit} 
      />
    );

    return (
      <div className={classes.container}>
        {component}
      </div>
    );
  }
}

export default withStyles(styles)(App);