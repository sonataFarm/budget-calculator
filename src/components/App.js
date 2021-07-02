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
import Step from './shared/Step';

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

  stepForward = () => {
    this.setState({ step: ++this.state.step });
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

  render() {
    const { budget, items, step } = this.state;
    const { classes } = this.props; 

    return (
      <div className={classes.container}>
        <Step number={0} currentStep={this.state.step}>
          <WelcomeScreen onNext={this.stepForward} />
        </Step>
        <Step number={1} currentStep={this.state.step}>
          <BudgetForm onSubmit={this.setBudget}/>
        </Step>
        <Step number={2} currentStep={this.state.step}>
          <BudgetCalculator 
            budget={budget} 
            items={items} 
            onSubmit={this.handleSubmit} 
          />
        </Step>
        <Step number={3} currentStep={this.state.step}>
          <ThankYouScreen />
        </Step>
      </div>
    );
  }
}

export default withStyles(styles)(App); 