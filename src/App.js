import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Segment } from 'semantic-ui-react'
import { appService } from './appService'
import Header from './components/Header'
import Layers from './components/Layers'
import EsriMap from './components/EsriMap'

class App extends Component {
  state = {
    layers: [],
    esriMap: {
      center: [-76.615, 39.289],
      zoom: 12
    }
  }
  async componentDidMount() {
    const response = await appService.getFeatures()
    const layers = response.map(layer => ({
      id: layer.id,
      title: layer.title,
      selected: false,
      tags: layer.tags
    }))
    this.setState({ layers })
  }
  onToggleSelection = id => {
    const { layers } = this.state
    this.setState({
      layers: layers.map(
        layer =>
          layer.id !== id ? layer : { ...layer, selected: !layer.selected }
      )
    })
  }
  render() {
    const { layers, esriMap } = this.state
    return (
      <Router>
        <Segment>
          <Header>
            <h3>Create Map</h3>
          </Header>
          <Route
            exact
            path="/"
            render={() => (
              <Layers
                layers={layers}
                toggleSelection={this.onToggleSelection}
              />
            )}
          />
          <Route
            path="/map"
            render={() => <EsriMap layers={layers} esriMap={esriMap} />}
          />
        </Segment>
      </Router>
    )
  }
}

export default App
