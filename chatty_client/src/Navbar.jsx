import React, {Component} from 'react';

// the display for the number of users has been included in the nav bar
class Navbar extends Component {
  render() {
    return (
    <nav className="navbar">
      <a href="/" className="navbar-brand"> Chatty </a>
      <span className="user-count">{this.props.userCount} users are online.</span>
    </nav>
  );
}
}
export default Navbar;
