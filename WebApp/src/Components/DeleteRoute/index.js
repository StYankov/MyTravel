import React from 'react';
import { towns, buses } from '../../firebase';
import { Promise } from 'es6-promise';
class DeleteRoute extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: [],
      hasSearched: false
    }
  }

  async searchLines(start) {
    const keys = await towns.child(start).once('value').then(x => x.val());
    const promiseArr = keys.map(id => new Promise((resolve, reject) => {
      buses.child(id).once('value')
        .then(x => {
          const bus = x.val();
          bus.id = id;
          resolve(bus);
        })
        .catch(() => reject());
    }));

    const dbResult = await Promise.all(promiseArr);
    const filtered = dbResult.filter(route => route.start.town === start);
    this.setState({ lines: filtered, hasSearched: true });
  }
  onBlur(e) {
    const target = e.target;
    const value = target.value;

    if (value === '') {
      this.setState({ lines: [] });
      return;
    }

    this.searchLines(value);
  }

  deleteRow(id) {
    this.setState({ lines: this.state.lines.filter(line => line.id !== id) });
  }
  render() {
    let lists = this.state.lines.map((bus, i) => <li className="list-item" key={bus.start.town + i}>
      <div>Линия: <span>{bus.start.town}</span> - <span>{bus.end.town}</span>  Тръгва: <span>{bus.departureTime}</span></div> <button onClick={() => this.deleteRow(bus.id)}>X</button>
    </li>);

    if (this.state.lines.length === 0 && this.state.hasSearched) lists = (<li>Не бяха намерени резултати</li>);

    return (
      <div className="container-inner">
        <h2 style={{ textAlign: 'center', fontSize: '24px' }} >Премахване на линии</h2>
        <input type="text" onBlur={this.onBlur.bind(this)} style={{ display: 'block', height: '30px', width: '80%', margin: '15px auto', padding: '5px' }} placeholder='Начална спирка' />
        <ul style={{ listStyle: 'none', margin: '0 auto', display: 'inline-block', width: '100%', padding: '0 40px',}}>
          {lists}
        </ul>
      </div>
    );
  }
}

export default DeleteRoute;