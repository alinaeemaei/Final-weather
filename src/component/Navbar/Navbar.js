import React, { Component } from "react";
import "./Navbar.css";
import ChangeLocation from "../ChangeLocation/ChangeLocation";

class Navbar extends Component {
  state = this.props.state;

  render() {
    if (this.props.state.ChangeLocation === "") {
      var classN = "change-location-hiden";
    } else {
      classN = "change";
    }
    return (
      <div>
        <nav>
          <p className={classN} onClick={this.props.navbarHandler}>
            {this.props.state.ChangeLocation}
          </p>
        </nav>
        <div id="open" className="sidenav">
          <ChangeLocation
            RemoveHandler={this.props.RemoveHandler}
            SearchListhadler={this.props.SearchListhadler}
          />
        </div>
      </div>
    );
  }
}

export default Navbar;
