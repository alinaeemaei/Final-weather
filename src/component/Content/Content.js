import React, { Component } from "react";
import "./Content.css";

class Content extends Component {
  moreForcastDetail(item) {
    // document.getElementById("more").style.display = "block";

    console.log("test", item);
  }
  render() {
    return (
      <div id="baseid" className="base">
        <div className="summery">
          <div className="location">
            {this.props.state.City}
            <p style={{ margin: "0", fontSize: "1rem" }}>
              {this.props.state.country}
            </p>
            <p style={{ margin: "0", fontSize: "0.8rem" }}>
              {this.props.state.date}
            </p>
          </div>
          <div className="gap" />
          <div className="temp">
            <div className="temp-c-numb">
              <p className="tempc">{this.props.state.temp}</p>
              <p className="cantigrad">.c</p>
              <img
                className="summery-icon"
                src={this.props.state.image}
                alt="icon"
              />
            </div>
            <p className="discription">{this.props.state.condition}</p>
          </div>
        </div>
        <div className=" details">
          <div id="forcastid" className="forcast">
            <h2 className="forcast-tag">Forecast</h2>
            <ul className="ul">
              {this.props.state.forecastDay.slice(0, 7).map((item, index) => (
                <li key={index}>
                  <div
                    onClick={() => this.moreForcastDetail(index)}
                    className="forcast-list"
                  >
                    <p className="date">{this.props.dateHandler(item)}</p>
                    <img
                      className="humidity-icon"
                      src="https://cdn1.iconfinder.com/data/icons/weather-line-icon-set-3/100/humidity-512.png"
                      alt="humidity"
                    />
                    <p className="humidity-number">{item.day.avghumidity}%</p>
                    <p className="maxtemp">{item.day.maxtemp_c}°c </p>
                    <p className="mintemp">{item.day.mintemp_c}°c</p>
                    <img
                      className="icon"
                      src={item.day.condition.icon}
                      alt=""
                    />
                  </div>
                  <div id="more" className="forcast-more-detail">
                    <p>more detail</p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              onClick={this.props.moreDayHandler.bind(this)}
              className="more-day"
            >
              {this.props.state.foreCastDayLongName}
            </button>
          </div>
          <div className="current">
            <h2 className="forcast-tag">Details</h2>
            <div className="current-base">
              <img
                className="current-Icon-img"
                src={this.props.state.image}
                alt="icon"
              />
              <div className="current-detail">
                <div className="simple-flex">
                  <p>Feels like :</p>
                  <p> {this.props.state.feelslike} c</p>
                </div>
                <p className="list-gap" />
                <div className="simple-flex">
                  <p>humidity : </p>
                  <p>{this.props.state.humidity} %</p>
                </div>
                <p className="list-gap" />
              </div>
            </div>
            <h2 className="forcast-tag">Wind</h2>
            <div className="wind">
              <p>Wind speed : </p>
              <p>{this.props.state.wind} kmh</p>

              <img
                style={{
                  animation: `wind-spin infinite ${
                    this.props.state.windSpeed
                  }s linear`
                }}
                id="w1"
                className="wind-logo"
                src="http://chittagongit.com/download/343647"
                alt="windIcon"
              />
              <p className="list-gap" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
