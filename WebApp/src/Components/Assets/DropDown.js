import React, { Component } from "react";
import { coords } from "../../firebase";

const Props = {
  name: String,
  value: String,
  onChagne: Function,
  preload: Boolean,
  ignoreEmpty: Boolean,
  numberAsValue: Boolean,
  dynamic: Boolean
};

class DropDownWithTowns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      towns: []
    };
  }

  componentDidMount() {
    if (this.props.preload) {
      coords.once("value").then(snapShot => {
        // Convert to JSON
        const value = snapShot.val();
        console.log(value);
        // Get Keys only - Just the names of towns
        let keys = Object.keys(value);

        if (this.props.ignoreEmpty) {
          keys = [];

          Object.keys(value).map(
            key => (value[key] !== 0 ? keys.push(key) : null)
          );
        }

        this.setState({
          towns: keys
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Update State only if Dynamic input
    if(this.props.dynamic && nextProps.towns) {
      this.setState({ towns: nextProps.towns });
    }
  }

  render() {
    const options = this.state.towns.sort().map((townName, i) => {
      // Used for getting latLong in Route Building
      let value = this.props.numberAsValue ? i : townName;
      return (
        <option key={townName} value={value}>
          {townName}
        </option>
      );
    });

    const { name, onChange, value, dynamic } = this.props;
    return (
      <div>
        <label htmlFor="town-select">Населено място</label>
        <div className="styled-select slate">
          <select name={name} onChange={onChange} value={value}>
            <option disabled value="">
              { dynamic ? 'Изберете спирка' : 'Избери населено място' }
            </option>
            {options}
          </select>
        </div>
      </div>
    );
  }
}

export default DropDownWithTowns;
