import React from 'react';
import db from '../util/db';
import WelcomeScreen from './WelcomeScreen';
import BudgetCalculator from './BudgetCalculator';

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

    const component = (!budget ?
      <WelcomeScreen onNext={this.setBudget} /> :
      <BudgetCalculator 
        budget={budget} 
        items={items} 
        onSubmit={this.handleSubmit} 
      />
    );

    return <div>{component}</div>;
  }
}

export default App;