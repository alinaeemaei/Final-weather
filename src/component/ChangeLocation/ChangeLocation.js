import React, { Component } from "react";
import SearchForm from "../searchForm/SearchForm";
import "./ChangeLocation.css";
import { error } from "util";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

class ChangeLocation extends Component {
  state = {
    newcityFullname: "",
    newCity: "",
    placeholder: "Search your Location",
    searchValu: [],
    list: []
  };

  onChangeHandler(event) {
    this.setState({ text: event.target.value });
    this.autoCompleteText(event);
  }

  autoCompleteText = async e => {
    const search = e.target.value;
    fetch(
      `https://api.apixu.com/v1/search.json?key=1652ea732ca848b7bd6100429192205&q=${search}`
    )
      .then(Response => {
        if (Response.ok) {
          return Response.json();
        } else {
          throw new error("something went rong");
        }
      })
      .then(data => {
        if (search.length >= 3) {
          this.setState({
            searchValu: data,
            newCity: search
          });
        } else {
          this.setState({
            searchValu: []
          });
        }
      })
      .catch(error => {});
  };

  SearchListHandle(event) {
    this.setState({
      newcityFullname: event.target.getAttribute("data-itemid"),
      text: event.target.getAttribute("data-itemid"),
      searchValu: []
    });
    this.getWeatherInfo(event);
  }

  getWeatherInfo = async e => {
    e.preventDefault();
    if (this.state.newCity !== "") {
      fetch(
        `https://api.apixu.com/v1/forecast.json?key=1652ea732ca848b7bd6100429192205&q=${
          this.state.newCity
        }&days=6`
      )
        .then(Response => {
          if (Response.ok) {
            return Response.json();
          } else {
            throw new error("your search not found");
          }
        })
        .then(data => {
          this.setState({
            newCity: "",
            placeholder: this.state.text,
            text: "",
            list: [
              ...this.state.list,
              {
                city: data.location.name,
                country: data.location.country,
                temp: data.current.temp_c,
                icon: data.current.condition.icon,
                fullname: this.state.text
              }
            ]
          });
        })
        .catch(error => {
          toaster.notify("Your search not found", {
            duration: 3000
          });
        });

      console.log(this.state.list);
    }
  };

  RemoveHandler(index) {
    var listN = this.state.list;
    listN.splice(index, 1);
    this.setState({
      list: listN
    });
  }

  render() {
    return (
      <div>
        <div>
          <SearchForm
            state={this.state}
            getWeatherInfo={this.getWeatherInfo.bind(this)}
            onChangeHandler={this.onChangeHandler.bind(this)}
            SearchListHandle={this.SearchListHandle.bind(this)}
          />
        </div>
        <div className="search-items">
          <ul className="search-list">
            {this.state.list.map((item, index) => (
              <li key={index}>
                <div className="list">
                  <div
                    onClick={() => this.props.SearchListhadler(item)}
                    className="list-click"
                  >
                    <div className="list-detail">
                      <p className="city">{item.city},</p>
                      <p className="country">{item.country},</p>
                      <p className="temp">{item.temp} .c</p>
                      <img className="icon" src={item.icon} alt="icon" />
                    </div>
                  </div>
                  <div
                    onClick={() => this.RemoveHandler(index)}
                    className="close-dive"
                  >
                    <img
                      className="close"
                      src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/143-512.png"
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="gap" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ChangeLocation;
