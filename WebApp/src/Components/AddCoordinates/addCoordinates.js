import React, { Component } from "react";
import GoogleMaps from "google-map-react";

import Input from "../Assets/Input";
import DropDownWithTowns from "../Assets/DropDown";
import { handleInput } from "../../Helpers/inputs";

import { coords } from "../../firebase";

const Marker = () => (
  <div style={{ position: 'absolute' }}>
    <i style={{ fontSize: 18 }} className="fas fa-map-marker-alt" />
  </div>
);

export default class AddCoord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      town: "",
      place: "",
      latitude: "",
      longitude: "",
      disabled: false
    };

    this.handleChange = handleInput.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  resetState() {
    this.setState({
      town: "",
      place: "",
      latitude: "",
      longitude: "",
      disabled: false
    });
  }

  onMapClick(event) {
    const { lat, lng } = event;

    this.setState({
      latitude: lat,
      longitude: lng
    });
  }

  writeDataToDB(currDbVal) {
    const latitude = parseFloat(this.state.latitude);
    const longitude = parseFloat(this.state.longitude);

    const { town, place } = this.state;

    // If current Cords is not array then it hasn't been written to;
    if (!Array.isArray(currDbVal)) {
      const latLongArr = [];
      latLongArr.push({
        latitude,
        longitude,
        place
      });

      coords
        .child(town)
        .set(latLongArr)
        .then(() => this.resetState());
    } else {
      currDbVal.push({
        latitude,
        longitude,
        place
      });

      coords
        .child(town)
        .set(currDbVal)
        .then(() => this.resetState());
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { town, latitude, longitude } = this.state;

    // Reject if input is empty
    if (town === "" || latitude === "" || longitude === "") return;

    // Disable Submit button
    this.setState({ disabled: true });

    // Retrieve current coords and check if they exist
    coords
      .child(town)
      .once("value")
      .then(snapShot => {
        const value = snapShot.val();
        if (value !== null) {
          // Town is not empty
          this.writeDataToDB(value);
        } else this.resetState();
      })
      .catch(() => this.resetState());
  }

  render() {
    const latitude = parseFloat(this.state.latitude);
    const longitude = parseFloat(this.state.longitude);

    const marker =
      !isNaN(latitude) && !isNaN(longitude) ? (
        <Marker lat={latitude} lng={longitude} />
      ) : null;

    return (
      <div>
        <form id="contact" onSubmit={this.onSubmit}>
          <DropDownWithTowns
            name="town"
            value={this.state.town}
            onChange={this.handleChange}
            preload
          />
          <Input
            key="place"
            name="place"
            label="Име: "
            value={this.state.place}
            onChange={this.handleChange}
          />
          <Input
            key="lat"
            name="latitude"
            label="Latitude: "
            value={this.state.latitude}
            onChange={this.handleChange}
          />
          <Input
            key="longitude"
            name="longitude"
            label="Longitude: "
            value={this.state.longitude}
            onChange={this.handleChange}
          />
          {/* Google Maps */}
          <div style={{ height: 400 }}>
            <GoogleMaps
              bootstrapURLKeys={{
                key: "AIzaSyCo3XV4woAYX3VYluCPE6MedofLYXhYSFM",
                language: "bg"
              }}
              center={{ lat: 42.020857, lng: 23.094339 }}
              defaultZoom={10}
              onClick={this.onMapClick.bind(this)}
            >
              {marker}
            </GoogleMaps>
          </div>
          <input
            className="btn"
            type="submit"
            value="Изпрати"
            disabled={this.state.disabled}
          />
        </form>
      </div>
    );
  }
}
