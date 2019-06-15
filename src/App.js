import React, { Component } from "react";
import Navbar from "./component/Navbar/Navbar";
import Content from "./component/Content/Content";
import "./App.css";
import toaster from "toasted-notes";
import { error } from "util";

class App extends Component {
  state = {
    searchName: "rashts",
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
    //when start app this method runing first and run resize and get data
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.getdata("tehran");
  }

  resize() {
    // set resize listener for pc or tablet for resizeing and rearnge the boxes and navbar and all ui component
    var maxW = window.matchMedia("(max-width:600px)");
    var minW = window.matchMedia("(min-width:600px)");
    if (window.matchMedia("(min-device-width:960px)").matches) {
      if (minW.matches) {
        this.setState({ ChangeLocation: "" });

        document.getElementById("open").style.width = "300px";
        document.getElementById("open").style.left = "0px";
        document.getElementById("open").style.position = "fixed";
        document.getElementById("baseid").style.marginLeft = "300px";

        this.setState({ ChangeLocation: "" });
      } else if (maxW.matches) {
        this.setState({ ChangeLocation: "Change Location " });

        document.getElementById("open").style.left = "-600px";
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
    // when screen set for mobile phone or when window resize width  our side nav going to hide the we use change location botton to show it

    if (this.state.opennav === true) {
      this.setState({
        opennav: false,
        ChangeLocation: "Done"
      });
      document.getElementById("open").style.width = "100%";
      document.getElementById("open").style.left = "0px";

      document.getElementById("baseid").style.filter = "blur(5px)";
    } else {
      this.setState({
        opennav: true,
        ChangeLocation: "Change Location"
      });

      document.getElementById("baseid").style.filter = "blur(0px)";
      document.getElementById("open").style.width = "100%";

      document.getElementById("open").style.left = "-600px";
    }
  }
  getdata = async fullname => {
    // get data from url with fetch and response  and then use setstate to push value to variable
    console.log(fullname);
    fetch(
      `https://api.apixu.com/v1/forecast.json?key=1652ea732ca848b7bd6100429192205&q=${fullname}&days=10`
    )
      .then(Response => {
        if (Response.ok) {
          return Response.json();
        } else {
          throw new error("somthing wrong");
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
        this.isdayHandler(this.state.isDay);
        this.windSpeedHandler(this.state.wind);
      })
      .catch(error => {
        toaster.notify(error, {
          duration: 3000
        });
      });
  };
  isdayHandler(a) {
    //get from api 0and 1 for day and night and we change background
    if (a === 0) {
      document.body.style.background = "linear-gradient(270deg, #337, #134)";
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
    // get text from search component and give value to the getdata()
    var maxW = window.matchMedia("(max-width:600px)");
    if (maxW.matches) {
      this.navbarHandler();
    }
    this.setState({ searchName: item.fullname });
    this.getdata(item.fullname);
    // console.log(item.fullname);
  }

  dateHandler(item) {
    // convert date to day
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
    //in forcast we show 4 day forcast detail whit this method you can choose between 4 and 7 day is good for ui
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
