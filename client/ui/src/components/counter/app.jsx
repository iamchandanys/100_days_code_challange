import React, { Component } from "react";
import NavBar from "../helper/navbar";
import Counters from "./counters";

class App extends Component {
  state = {
    counters: [],
  };

  // called only once when the component loads.
  // perfect place to init the variables.
  constructor() {
    super();
    this.state.counters = [
      { id: 1, value: 4 },
      { id: 2, value: 5 },
      { id: 3, value: 0 },
      { id: 4, value: 8 },
    ];
  }

  // called after the component rendered into DOM.
  // perfect place to make API calls.
  componentDidMount() {}

  handleIncrement = (counterObj) => {
    const countersList = [...this.state.counters];
    const index = countersList.indexOf(counterObj);
    countersList[index] = { ...counterObj };
    countersList[index].value++;
    this.setState({ counters: countersList });
  };

  handleDecrement = (counterObj) => {
    const countersList = [...this.state.counters];
    const index = countersList.indexOf(counterObj);
    countersList[index] = { ...counterObj };
    countersList[index].value--;
    this.setState({ counters: countersList });
  };

  handleDelete = (counterId) => {
    const newCountersList = this.state.counters.filter((e) => e.id !== counterId);
    this.setState({ counters: newCountersList });
  };

  handleReset = () => {
    const newCountersList = this.state.counters.map((counter) => {
      counter.value = 0;
      return counter;
    });
    this.setState({ counters: newCountersList });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar totalCounters={this.state.counters.filter((e) => e.value > 0).length} />
        <br />
        <main className="container">
          <Counters counters={this.state.counters} onReset={this.handleReset} onIncrement={this.handleIncrement} onDelete={this.handleDelete} onDecrement={this.handleDecrement} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
