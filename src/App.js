import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Segment } from 'semantic-ui-react';
import { Consumer, Provider } from './AppContext';
import EsriMap from './components/EsriMap';
import Layers from './components/Layers';

class App extends Component {
  state = {
    searchTerm: '',
    layers: [],
  };
  render() {
    return (
      <Provider>
        <Router>
          <Segment>
            <Route exact path="/" component={Layers} />
            <Route
              path="/map/:mapId"
              render={({ match }) => (
                <Consumer>
                  {({ layers }) => (
                    <EsriMap layers={layers} match={match} editable="Yes" />
                  )}
                </Consumer>
              )}
            />
          </Segment>
        </Router>
      </Provider>
    );
  }
}

export default App;
