import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  state = {};

  static propTypes = {
    city: PropTypes.string.isRequired
  };

  static defaultProps = {
    city: "lisbon"
  };

  constructor(props) {
    super(props);

    let apiUrl = "https://api.openweathermap.org";
    let apiKey = "8682ae70ef78caa3eef84e53a0fb2349";
    let apiParams = "appid=" + apiKey + "&units=metric";

    axios
      .get(apiUrl + "/data/2.5/weather?" + apiParams + "&q=" + this.props.city)
      .then(response => {
        this.setState({
          conditions: {
            city: response.data.name,
            description: response.data.weather[0].main,
            icon: response.data.weather[0].main,
            precipitation: Math.round(response.data.main.humidity) + "%",
            temperature: Math.round(response.data.main.temp),
            time: this.friendlyDate(new Date()),
            wind: Math.round(response.data.wind.speed) + "km/h"
          }
        });
      });
  }

  friendlyDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    return days[date.getDay()] + " " + date.getHours() + ":" + minutes;
  }

  render() {
    if (this.state.conditions) {
      return (
        <div className="row">
          <div className="col col-md-4">
            <div className="clearfix">
              <div className="temperature-now">
                {this.state.conditions.temperature}
              </div>
              <div className="weather-unit">°C</div>
            </div>
          </div>

          <div className="weather-summary">
            <div className="weather-summary-header">
              <h1>{this.state.conditions.city}</h1>
              <div className="weather-detail__text">
                {this.state.conditions.time}
              </div>
              <div className="weather-detail__text">
                {this.state.conditions.description}
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="weater-details">
              <div className="row">
                <div className="col-md-2">
                  <div className="row">
                    <div className="detail-box detail-box__humidity">
                      <i className="fas fa-tint detail-icon" />
                      <p className="detail-title detail-title__Humidity">
                        Humidity
                      </p>
                      <p className="detail-result__Humidity">
                        {this.state.conditions.precipitation}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="row">
                    <div className="detail-box detail-box__uvIndex">
                      <i className="fas fa-sun detail-icon" />
                      <p className="detail-title detail-title__uvIndex">
                        UV Index
                      </p>
                      <p className="detail-result__uvIndex">5</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="row">
                    <div className="detail-box detail-box__pressure">
                      <i className="fas fa-tachometer-alt detail-icon" />
                      <div className="detail-title detail-title__pressure">
                        Pressure
                      </div>
                      <div className="detail-result__pressure">1008.8 mb</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="row">
                    <div className="detail-box detail-box__wind">
                      <i className="fas fa-wind detail-icon" />
                      <p className="detail-title detail-title__wind">Wind</p>
                      <p className="detail-result__wind">
                        {this.state.conditions.wind}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          App is loading, <em>please wait</em>
        </div>
      );
    }
  }
}
