import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from './Components/Header';

import AddTown from './Components/AddTown/addTown';
import AddCoords from './Components/AddCoordinates/addCoordinates';
import AddRoute from './Components/AddRoute/AddRoute';
import Reports from './Components/Report/reports';
import DeleteRoute from './Components/DeleteRoute/index';

class App extends Component {
  render() {
    return (
      <div>
		<Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={AddRoute} />
            <Route path="/towns" component={AddTown} />
            <Route path="/stops" component={AddCoords} />
            <Route path="/reports" component={Reports} />
            <Route path="/delete-route" component={DeleteRoute} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
