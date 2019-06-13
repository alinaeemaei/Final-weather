import React, { Component } from "react";
import Navbar from "./component/Navbar/Navbar";
import Content from "./component/Content/Content";
import "./App.css";
import { error } from "util";

console.log("goz");
class App extends Component {
  state = {
    searchName: "rasht",
    opennav: true,
    ChangeLocation: "change Location",
    foreCastDayLong: 7,
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
    var maxW = window.matchMedia("(max-width:641px)");
    var minW = window.matchMedia("(min-width:641px)");
    if (window.matchMedia("(min-device-width:960px)").matches) {
      if (minW.matches) {
        this.setState({ ChangeLocation: "" });

        document.getElementById("open").style.width = "250px";
        document.getElementById("open").style.position = "fixed";
        document.getElementById("baseid").style.marginLeft = "250px";
        this.setState({ ChangeLocation: "" });
      } else if (maxW.matches) {
        this.setState({ ChangeLocation: "Change Location " });

        document.getElementById("open").style.width = "0";
        document.getElementById("open").style.position = "fixed";
        document.getElementById("baseid").style.marginLeft = "0";
      }
    } else if (window.matchMedia("(orientation:landscape)").matches) {
      document.getElementById("open").style.width = "0";
      document.getElementById("home").style.display = "block";
    } else if (window.matchMedia("(orientation:portrait)").matches) {
      document.getElementById("home").style.display = "none";
    }
  }
  navbarHandler() {
    if (this.state.opennav === true) {
      this.setState({
        opennav: false,
        ChangeLocation: "Done"
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
    fetch(
      `https://api.apixu.com/v1/forecast.json?key=1652ea732ca848b7bd6100429192205&q=${fullname}&days=10`
    )
      .then(Response => {
        if (Response.ok) {
          return Response.json();
        } else {
          throw new error("somthing wrong");
          console.log("wrong");
        }
      })
      .then(responseJason => {
        const data = responseJason;
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
      })
      .catch(error => {
        alert(error, "try again");
      });
    /*   if (this.state.searchName !== "") {
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
    }*/
    this.isdayHandler(this.state.isDay);
    this.windSpeedHandler(this.state.wind);
  };
  isdayHandler(a) {
    //get from api 0and 1 for day and night and we change background
    if (a === 0) {
      document.body.style.background = "linear-gradient(270deg, #337, #001)";
      document.body.style.backgroundSize = "400% 400%";
    } else if (a === 1) {
      document.body.style.background =
        "linear-gradient(120deg, #11cc85 0%, #1177ff 120%)";
      document.body.style.backgroundSize = "300% 300%";
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
        foreCastDayLongButton: false,
        foreCastDayLongName: "less day"
      });
      document.getElementById("forcastid").style.height = "550px";
    } else {
      this.setState({
        foreCastDayLongButton: true,
        foreCastDayLongName: "More day"
      });
      document.getElementById("forcastid").style.height = "380px";
    }
  }

  render() {
    return (
      <div>
        <div id="home" className="home">
          <p>Plase Rotate Screen to Portrate</p>
        </div>
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
