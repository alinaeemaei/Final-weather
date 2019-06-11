import React, { Component } from "react";
import "./Navbar.css";
import ChangeLocation from "../ChangeLocation/ChangeLocation";

class Navbar extends Component {
  state = this.props.state;

  render() {
    return (
      <div>
        <nav>
          <a href="#" className="nav-item">
            Weather
          </a>
          <a
            className="change-Location"
            href="#"
            onClick={this.props.navbarHandler}
          >
            {this.props.state.ChangeLocation}
          </a>
        </nav>
        <div id="open" className="sidenav">
          <ChangeLocation SearchListhadler={this.props.SearchListhadler} />
        </div>
      </div>
    );
  }
}

export default Navbar;
