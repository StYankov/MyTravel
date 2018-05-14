import React, { Component } from "react";

import './animate.css';

import { buses, towns } from "../../firebase";

import InputWithSelect from "./Components/InputWithSelect";
import Input from "../Assets/Input";
import DropDownWork from "./Components/DropDownWork";

import { Promise } from "es6-promise";

class AddRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dynamicInputs: [{ inp: "Спирка-1", value: "", stop: {} }],
      busLine: {
        start: "",
        startBusStop: {},
        end: "",
        endBusStop: {},
        departTime: "",
        workTime: ""
      },
      disabled: false,
      fadeClass: "fadeOut"
    };
    this.onInputValueSelect = this.onInputValueSelect.bind(this);
    this.appendInput = this.appendInput.bind(this);
    this.dynamicSetValue = this.dynamicSetValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  triggerMsg() {
    this.setState({ fadeClass: 'fadeIn' });
    setTimeout(() => {
      this.setState({ fadeClass: "fadeOut" });
    }, 2500);
  }

  handleInput(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    const { busLine } = this.state;

    busLine[name] = value;

    this.setState({ busLine });
  }

  onInputValueSelect(inputName, inputValue) {
    const { busLine } = this.state;

    busLine[inputName] = inputValue;

    this.setState({ busLine });
  }

  appendInput(e) {
    e.preventDefault();
    const { dynamicInputs } = this.state;
    dynamicInputs.push({
      inp: `Спирка-${dynamicInputs.length + 1}`,
      value: "",
      stop: {}
    });

    this.setState({ dynamicInputs });
  }

  dynamicSetValue(inputName, inputValue) {
    const { dynamicInputs } = this.state;

    if (typeof inputValue === "string") {
      dynamicInputs[inputName].value = inputValue;
    } else {
      dynamicInputs[inputName].stop = inputValue;
    }

    this.setState({ dynamicInputs });
  }

  createSingleStopObj(town, busStop) {
    return {
      town,
      latLong: busStop
    };
  }

  assembleBusObject() {
    const route = {};
    const { busLine, dynamicInputs } = this.state;

    route.start = this.createSingleStopObj(busLine.start, busLine.startBusStop);
    route.middle = dynamicInputs.map(input =>
      this.createSingleStopObj(input.value, input.stop)
    );
    route.end = this.createSingleStopObj(busLine.end, busLine.endBusStop);

    route.departureTime = busLine.departTime;
    route.workTime = busLine.workTime;

    return route;
  }

  async updateTownsinDb(key, bus) {
    const townsSet = new Set();
    townsSet.add(bus.start.town);
    bus.middle.map(bStop => townsSet.add(bStop.town));
    townsSet.add(bus.end.town);

    const townsPromiseArr = [];

    for (const town of townsSet) {
      townsPromiseArr.push(new Promise((resolve, reject) => {
        towns.child(town).once('value')
          .then(snapshot => resolve({ town, value: snapshot.val() }))
          .catch(() => reject());
      }));
    }

    const townsFromDB = await Promise.all(townsPromiseArr);
    const promiseArr = [];

    for (const townObj of townsFromDB) {
      if (Array.isArray(townObj.value)) {
        townObj.value.push(key);
        promiseArr.push(new Promise((resolve, reject) => {
          towns.child(townObj.town).set(townObj.value)
            .then(() => resolve())
            .catch(() => reject());
        }));
      } else {
        const townsArr = [key];
        promiseArr.push(new Promise((resolve, reject) => {
          towns.child(townObj.town).set(townsArr)
            .then(() => resolve())
            .catch(() => reject());
        }));
      }
    }

    await Promise.all(promiseArr)

    this.setState({ disabled: false });
  }
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ disabled: true });

    const bus = this.assembleBusObject();

    buses.push(bus).then(snapShot => {
      const key = snapShot.key;
      this.updateTownsinDb(key, bus);
      this.triggerMsg();
    });
  }

  render() {
    const { busLine } = this.state;
    const disableButton = this.state.disabled;
    const dynamicInputs = this.state.dynamicInputs.map((input, i) => (
      <div key={input.inp}>
        <InputWithSelect
          name={i}
          bsName={i}
          label={input.inp}
          townValue={input.value}
          stopValue={input.stop}
          setValue={this.dynamicSetValue}
        />
        <button
          className="btn"
          onClick={() =>
            this.setState(prevvState => {
              return {
                dynamicInputs: prevvState.dynamicInputs.filter(
                  x => x.inp !== input.inp
                )
              };
            })
          }
        >
          Изтрии спирка
        </button>
      </div>
    ));

    return (
      <div>
        <div className={`notification animated ${this.state.fadeClass}`}>
          <h2>&#10004;  Успешно изпращане</h2>
        </div>
        <form id="contact" onSubmit={this.handleSubmit}>
          <h3>Въвеждане на Автобусни линии</h3>
          <InputWithSelect
            name="start"
            bsName="startBusStop"
            label="Старт"
            townValue={busLine.start}
            stopValue={busLine.startBusStop}
            setValue={this.onInputValueSelect}
          />
          <Input
            key="departTime"
            name="departTime"
            label="Време на тръгване:"
            value={busLine.departTime}
            onChange={this.handleInput}
          />
          <div id="dynamicInput">
            {dynamicInputs}
            <button className="btn" onClick={this.appendInput}>
              Добави спирка
            </button>
            <br />
          </div>

          <InputWithSelect
            name="end"
            bsName="endBusStop"
            label="Край"
            townValue={busLine.end}
            stopValue={busLine.endBusStop}
            setValue={this.onInputValueSelect}
          />
          <DropDownWork
            name="workTime"
            label="Работно време"
            onChange={this.handleInput}
            value={busLine.workTime}
          />
          <button type="submit" style={{ marginTop: 15 }} disabled={disableButton} value="Изпрати">
            Изпрати
          </button>
        </form>
      </div>
    );
  }
}

export default AddRoute;
