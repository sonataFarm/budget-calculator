import React from 'react';
import _ from 'lodash';
import faker from 'faker';
import { withStyles } from '@material-ui/core/styles';
import db from '../util/db';
import Background from '../images/background.png'
import Item from '../util/item';
import WelcomeScreen from './WelcomeScreen';
import BudgetForm from './BudgetForm';
import BudgetCalculator from './BudgetCalculator';
import ThankYouScreen from './ThankYouScreen';

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
    this.state = { items: [], budget: null, step: 0 };
    this.username = faker.internet.userName(); // we'll use this later when we persist to the DB
  }

  componentDidMount() {
    this.fetchAndSetItems();
  }

  fetchAndSetItems = async () => {
    let items = await db.fetchUniqueItems();
    items = items.map(i => new Item(i));
    this.setState({ items });
  };

  setBudget = budget => {
    this.setState({ budget });
    this.stepForward();
  };

  handleSubmit = selectedItems => {
    db.setUser({ username: this.username });
    db.setCart(selectedItems, this.username);
    this.stepForward();
  };

  stepForward = () => {
    this.setState({ step: ++this.state.step });
  };

  render() {
    const { budget, items, step } = this.state;
    const { classes } = this.props; 

    let components = [
      <WelcomeScreen onNext={this.stepForward} />,
      <BudgetForm onSubmit={this.setBudget}/>,
      <BudgetCalculator 
        budget={budget} 
        items={items} 
        onSubmit={this.handleSubmit} 
      />,
      <ThankYouScreen />
    ];

    return (
      <div className={classes.container}>
        {components[step]}
      </div>
    );
  }
}

export default withStyles(styles)(App); 