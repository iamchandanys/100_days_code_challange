import React, { Component } from "react";

class Counter extends Component {
  styles = {
    fontSize: 10,
    fontWeight: "bold",
  };

  render() {
    return (
      // Most common use case for React fragments is probably when you need to return multiple elements.
      // With fragments this is easy and you don’t need your typical wrapper empty div for the elements.
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="row">
                <div className="col">
                  <span style={this.styles} className={this.getBadgeClassess()}>
                    {this.formatCount()}
                  </span>
                </div>
                <div className="col">
                  <button style={{ fontSize: 15 }} className="btn btn-secondary btn-sm" onClick={() => this.props.onIncrement(this.props.counterObj)}>
                    +
                  </button>
                  &nbsp;&nbsp;
                  <button style={{ fontSize: 15 }} disabled={this.props.counterObj.value <= 0} className="btn btn-secondary btn-sm" onClick={() => this.props.onDecrementCtrs(this.props.counterObj)}>
                    -
                  </button>
                  &nbsp;&nbsp;
                  <button className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(this.props.counterObj.id)}>
                    X
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-9"></div>
          </div>
        </div>
        <br />
        <br />
      </React.Fragment>
    );
  }

  getBadgeClassess() {
    let countClass = "badge m-2 ";
    countClass += this.props.counterObj.value === 0 ? "bg-warning" : "bg-primary";
    return countClass;
  }

  formatCount() {
    const { value } = this.props.counterObj;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
