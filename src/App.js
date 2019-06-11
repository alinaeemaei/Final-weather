import React, { Component } from "react";
import Navbar from "./component/Navbar/Navbar";
import Content from "./component/Content/Content";
import ChangeLocation from "./component/ChangeLocation/ChangeLocation";
import "./App.css";

class App extends Component {
  state = {
    searchName: "rasht",
    opennav: true,
    ChangeLocation: "change Location",
    foreCastDayLong: 4,
    foreCastDayLongName: "More day",
    foreCastDayLongButton: true,
    firstRun: true,
    placeholder: "enter city",
    newCity: "tehran",
    City: "",
    date: "",
    country: "",
    condition: "",
    temp: "",
    forecastDay: [],
    image: "",
    searchValu: [],
    text: "",
    isDay: 0,
    humidity: "",
    feelslike: "",
    wind: ""
  };

  componentDidMount = async e => {
    if (this.state.newCity !== "") {
      const api = await fetch(
        `https://api.apixu.com/v1/forecast.json?key=1652ea732ca848b7bd6100429192205&q=${
          this.state.searchName
        }&days=10`
      );
      const data = await api.json();
      this.setState({
        City: data.location.name,
        country: data.location.country,
        date: data.location.localtime,
        temp: data.current.temp_c,
        image: data.current.condition.icon,
        condition: data.current.condition.text,
        text: "",
        placeholder: this.state.text,
        isDay: data.current.is_day,
        humidity: data.current.humidity,
        feelslike: data.current.feelslike_c,
        forecastDay: data.forecast.forecastday,
        wind: data.current.wind_kph
      });
      console.log(this.state.isDay);
    }
    this.isdayHandler(this.state.isDay);
    this.windSpeedHandler(this.state.wind);
  };
  isdayHandler(a) {
    if (a === 0) {
      document.body.style.background = "linear-gradient(270deg, #334, #115)";
      document.body.style.backgroundSize = "400% 400%";
    } else {
      document.body.style.backgroun =
        "linear-gradient(120deg, #3075e2 0%, #ecf9ff 120%)";
    }
    // console.log(a);
  }

  windSpeedHandler(wind) {
    var speed = 0;
    if (wind > 0 && wind <= 5) {
      speed = 30;
    } else if (wind > 5 && wind <= 10) {
      speed = 25;
    } else if (wind > 10 && wind <= 15) {
      speed = 20;
    } else if (wind > 15 && wind <= 20) {
      speed = 15;
    } else if (wind > 20 && wind <= 25) {
      speed = 10;
    } else if (wind > 25 && wind < 50) {
      speed = 5;
    }

    document.getElementById(
      "w1"
    ).style.animation = `App-wind-spin infinite ${speed}s linear`;
    console.log(wind);
    console.log(speed);
  }

  SearchListhadler(item) {
    console.log(this.state.searchName);
    this.navbarHandler();
    this.setState({ searchName: item.fullname });
  }
  navbarHandler() {
    if (this.state.opennav === true) {
      document.getElementById("open").style.width = "100%";
      document.body.style.position = "fixed";
      this.setState({ opennav: false, ChangeLocation: "Cancel" });
    } else {
      document.getElementById("open").style.width = "0";
      document.body.style.position = "relative";
      this.setState({ opennav: true, ChangeLocation: "Change Location" });
    }
  }
  dateHandler(item) {
    var d = new Date(item.date);
    var n = d.getDay();
    var day;
    switch (n) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      default:
    }
    return day;
  }

  moreDayHandler() {
    if (this.state.foreCastDayLongButton === true) {
      this.setState({
        foreCastDayLong: 7,
        foreCastDayLongButton: false,
        foreCastDayLongName: "less day"
      });
    } else {
      this.setState({
        foreCastDayLong: 4,
        foreCastDayLongButton: true,
        foreCastDayLongName: "More day"
      });
    }
  }
  render() {
    return (
      <div className="home">
        <Navbar
          navbarHandler={this.navbarHandler.bind(this)}
          SearchListhadler={this.SearchListhadler.bind(this)}
        />
        <Content
          dateHandler={this.dateHandler.bind(this)}
          moreDayHandler={this.moreDayHandler.bind(this)}
          isdayHandler={this.isdayHandler.bind(this)}
          windSpeedHandler={this.windSpeedHandler.bind(this)}
          state={this.state}
        />
      </div>
    );
  }
}

export default App;
