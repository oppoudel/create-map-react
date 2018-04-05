import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Segment } from 'semantic-ui-react';
import { appService, mapId } from './appService';
import Layers from './components/Layers';
import EsriMap from './components/EsriMap';
import base from './base';

class App extends Component {
  state = {
    searchTerm: '',
    layers: [],
  };
  componentDidMount() {
    appService.getFeatures().then(response => {
      const layers = response.map(layer => ({
        id: layer.id,
        title: layer.title,
        selected: false,
        tags: layer.tags,
      }));
      this.setState({ layers });
    });
    this.ref = base.syncState(`${mapId}/layers`, {
      context: this,
      state: 'layers',
    });
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
            render={() => (
              <Layers
                layers={layers}
                toggleSelection={this.onToggleSelection}
                onSelectInputChange={this.onSelectInputChange}
                searchTerm={searchTerm}
                mapId={mapId}
              />
            )}
          />
          <Route
            path="/map/:mapId"
            render={({ match }) => <EsriMap layers={layers} match={match} />}
          />
        </Segment>
      </Router>
    );
  }
}

export default App;
