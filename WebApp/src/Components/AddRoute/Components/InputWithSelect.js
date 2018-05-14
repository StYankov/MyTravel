import React, { Component } from "react";

import DropDown from "../../Assets/DropDown";
import { cleanArray } from '../../../Helpers/inputs';

import { coords } from "../../../firebase";

export default class InputWithSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      town: "",
      selectValue: "",
      selectedBusStop: {},
      stops: []
    };

    this.onBlur = this.onBlur.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  searchCoords() {
    if(this.state.town === '') return;

    coords.child(this.state.town).once('value')
      .then(snapShot => {
        const value = cleanArray(snapShot.val());
        if ( value === null || value === 0 ) return;
        this.setState({ stops: value });
      })
      .catch(() => undefined);
  }

  onBlur(e) {
    const target = e.target;
    const value = target.value;

    // Check if value is the same as before and ignore it if true
    if(value === this.state.town) return;

    this.setState({ town: value }, this.searchCoords);
    this.props.setValue(this.props.name, value);
    // Search if bus stops exist for the given town
  }

  onSelect(e) {
    const target = e.target;
    //const value = Number(target.value);
    const value = target.value;

    // const selected = this.state.stops[value];
    const selected = this.state.stops.filter(x => x.place === value)[0];
    
    this.setState({
      selectValue: value,
      selectedBusStop: selected
    }, () => {
      // Set value to parent element
      this.props.setValue(this.props.bsName, selected);
    });
  }

  render() {
    const { name, label } = this.props;
    const { stops } = this.state;

    const stopPlaces = stops.map(coord => coord.place);
    
    return (
      <div style={{ display: "block", marginTop: 5, marginBottom: 5 }}>
        <label htmlFor={name}>{label}</label>
        <input required type="text" name={name} onBlur={this.onBlur} />
        <DropDown
          name={name}
          value={this.state.selectValue}
          onChange={this.onSelect}
          ignoreEmpty
          dynamic
          towns={stopPlaces}
        />
      </div>
    );
  }
}
