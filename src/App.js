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
    wind: "",
    windSpeed: "",
    classname: ""
  };

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.getdata("theran");
    this.isdayHandler(this.state.isDay);
    this.windSpeedHandler(this.state.wind);
  }
  resize() {
    if (window.innerWidth > 600) {
      this.setState({ ChangeLocation: "" });
      document.getElementById("open").style.width = "300px";
      document.getElementById("open").style.background = "rgba(0, 0, 50, .8)";
      document.getElementById("open").style.position = "fixed";
      document.getElementById("baseid").style.marginLeft = "300px";

      this.setState({ ChangeLocation: "" });
    } else if (window.innerWidth < 600) {
      this.setState({ ChangeLocation: "Change location" });
      document.getElementById("open").style.width = "0";
      document.getElementById("baseid").style.marginLeft = "0%";
      document.getElementById("open").style.background = "rgba(0, 0, 0, 0.76)";
      document.getElementById("open").style.position = "absolute";
    }
  }
  navbarHandler() {
    if (this.state.opennav === true) {
      this.setState({
        opennav: false,
        ChangeLocation: "cancel"
      });
      document.getElementById("open").style.width = "100%";
    } else {
      this.setState({
        opennav: true,
        ChangeLocation: "Change Location"
      });
      document.getElementById("open").style.width = "0%";
    }
  }
  getdata = async fullname => {
    if (this.state.searchName !== "") {
      const api = await fetch(
        `https://api.apixu.com/v1/forecast.json?key=1652ea732ca848b7bd6100429192205&q=${fullname}&days=10`
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
      // console.log(this.state.isDay);
    }
    this.isdayHandler(this.state.isDay);
    this.windSpeedHandler(this.state.wind);
  };
  isdayHandler(a) {
    //get from api 0and 1 for day and night and we change background
    if (a === 0) {
      document.body.style.background = "linear-gradient(270deg, #334, #115)";
      document.body.style.backgroundSize = "450% 450%";
    } else if (a === 1) {
      document.body.style.background =
        "linear-gradient(120deg, #3075e2 0%, #ecf9ff 120%)";
      document.body.style.backgroundSize = "450% 450%";
    }
    // console.log("bib", a);
  }

  windSpeedHandler(wind) {
    var speed = 0;
    if (wind > 0 && wind <= 5) {
      speed = 25;
    } else if (wind > 5 && wind <= 10) {
      speed = 21;
    } else if (wind > 10 && wind <= 15) {
      speed = 16;
    } else if (wind > 15 && wind <= 20) {
      speed = 11;
    } else if (wind > 20 && wind <= 25) {
      speed = 6;
    } else if (wind > 25 && wind < 50) {
      speed = 1;
    }

    this.setState({ windSpeed: speed });
    // console.log(wind);
    // console.log(speed);
  }

  SearchListhadler(item) {
    if (window.innerWidth < 600) {
      this.navbarHandler();
    }
    this.setState({ searchName: item.fullname });
    this.getdata(item.fullname);
    console.log(item.fullname);
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
          RemoveHandler={this.RemoveHandler}
          state={this.state}
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
