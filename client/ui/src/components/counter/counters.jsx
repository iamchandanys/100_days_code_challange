import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  // called when any element in the component gets updated.
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
  }

  // called when just before an element is removed from the DOM.
  componentWillUnmount() {}

  render() {
    const { counters, onReset, onDelete, onIncrement, onDecrement } = this.props;
    return (
      <div>
        <button className="btn btn-info btn-sm" onClick={onReset}>
          Reset
        </button>
        <br />
        <br />
        {counters.map((counter) => (
          <Counter key={counter.id} counterObj={counter} onDelete={onDelete} onIncrement={onIncrement} onDecrementCtrs={onDecrement} />
        ))}
      </div>
    );
  }
}

export default Counters;
