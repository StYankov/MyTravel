import React from 'react';
import { reports } from '../../firebase';

class Reports extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: []
    }
  }

  removeWarning(id) {
    reports.child(id).remove(() => {
      reports.once('value')
      .then(val => {
        const reps = [];
        const response = val.val();
        for (const key of Object.keys(response)) {
          reps.push({ userID: response[key].userID, sent: response[key].sent, message: response[key].message, key });
        }

        this.setState({ reports: reps });
      })
      .catch(() => undefined);
    });
  }

  componentDidMount() {
    reports.once('value')
      .then(val => {
        const reps = [];
        const response = val.val();
        for (const key of Object.keys(response)) {
          reps.push({ userID: response[key].userID, sent: response[key].sent, message: response[key].message, key });
        }

        this.setState({ reports: reps });
      })
      .catch(() => undefined);
  }

  render() {

    const rows = this.state.reports.map((report, i) => (
      <div key={i} className="message-container">
        <div className="sign-container">
          <img src={require('./sign.png')} alt="sign" />
        </div>
        <div className="content-container">
          <h2>Дата: {new Date().toISOString().slice(0, 10)}</h2>
          <p className="text">{report.message}</p>
        </div>
        <div className="remove-button">
          <button onClick={() => this.removeWarning(report.key)}>
            X
          </button>
        </div>
      </div>));

    return (
      <div className="container-inner">
        {rows.length === 0 ? <h2>Няма съобщения</h2> :
          rows}
      </div>
    );
  }
}

export default Reports;