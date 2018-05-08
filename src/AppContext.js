import pick from 'lodash/pick';
import React, { Component } from 'react';
import { appService, mapId } from './appService';
import base from './base';

const AppContext = React.createContext();

export class Provider extends Component {
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
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          onToggleSelection: this.onToggleSelection,
          onSelectInputChange: this.onSelectInputChange,
          mapId: mapId,
        }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const Consumer = AppContext.Consumer;
