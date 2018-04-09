import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import pick from 'lodash/pick';
import 'semantic-ui-css/semantic.min.css';
import { Segment, Loader, Dimmer } from 'semantic-ui-react';
import { appService, mapId } from './appService';
import Layers from './components/Layers';
import EsriMap from './components/EsriMap';
import base from './base';

class App extends Component {
  state = {
    searchTerm: '',
    layers: [],
  };
  async componentDidMount() {
    const response = await appService.getFeatures();
    const layers = response.map(layer =>
      pick(layer, ['id', 'title', 'selected', 'tags']),
    );
    this.ref = base.syncState(`${mapId}/layers`, {
      context: this,
      state: 'layers',
    });
    this.setState({ layers });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  onToggleSelection = id => {
    const { layers } = this.state;
    this.setState({
      layers: layers.map(
        layer =>
          layer.id !== id ? layer : { ...layer, selected: !layer.selected },
      ),
    });
  };
  onSelectInputChange = event => {
    this.setState({
      searchTerm: event.target.value,
    });
  };
  render() {
    const { layers, searchTerm } = this.state;
    return (
      <Router>
        <Segment>
          <Route
            exact
            path="/"
            render={() =>
              layers.length < 1 ? (
                <Dimmer active style={{ height: '100vh' }} inverted>
                  <Loader size="massive" inverted />
                </Dimmer>
              ) : (
                <Layers
                  layers={layers}
                  toggleSelection={this.onToggleSelection}
                  onSelectInputChange={this.onSelectInputChange}
                  searchTerm={searchTerm}
                  mapId={mapId}
                />
              )
            }
          />
          <Route
            path="/map/:mapId"
            render={({ match }) => (
              <EsriMap layers={layers} match={match} editable="Yes" />
            )}
          />
        </Segment>
      </Router>
    );
  }
}

export default App;
