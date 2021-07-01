import React from 'react';

class BudgetCalculator extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { items, budget, onSubmit } = this.props;

    return (
      <div onClick={onSubmit}>
        <div>{items.length} items</div>
        <div>${budget}</div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    );
  }
}

export default BudgetCalculator;