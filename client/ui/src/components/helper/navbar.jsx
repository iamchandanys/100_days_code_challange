import React from "react";

// Stateless Functional Component
// React will automatically bind the props to an arrow function
const NavBar = (props) => {
  return <nav className="navbar navbar-light bg-light">Navbar ({props.totalCounters})</nav>;
};

export default NavBar;
