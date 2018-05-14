import React, { Component } from "react";
import { coords } from "../../firebase";
import { handleInput } from "../../Helpers/inputs";
class TownsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      town: "",
      disabled: false,
      error: ""
    };

    this.handleInput = handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  resetState() {
    this.setState({
      town: "",
      disabled: false,
      error: ""
    });
  }

  async onSubmit(e) {
    const town = this.state.town;

    // Prevent window refresh
    e.preventDefault();

    // Disable submit button
    this.setState({ disabled: true });

    // Check if value is in DB
    // IF value is in DB displa Error
    // ELSE write the new value to DB
    // This is done to escape OVERWRITING old inputs
    try {
      // Get Value from DB
      const value = await coords
        .child(town)
        .once("value")
        .then(x => x.val());

      // Check if value in db is empty
      if (value !== 0 && value !== null) {
        this.setState({
          error: "Градът съществува в списъка",
          disabled: false
        });
      } else { // VALUE is Empty or not written -> write new value
        coords
          .child(town)
          .set(0)
          .then(x => this.resetState());
      }
    } catch (err) {
      this.setState({ error: err, disabled: false });
    }
  }

  render() {
    const displayError = this.state.error !== "" ? "block" : "none";

    return (
      <div>
        <form id="contact" onSubmit={this.onSubmit}>
          <div style={{ display: displayError, color: "red" }}>
            Грешка: {this.state.error}
          </div>
          <label htmlFor="town">Град: </label>
          <input
            type="text"
            name="town"
            id="town"
            value={this.state.town}
            onChange={this.handleInput}
          />
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

export default TownsForm;
