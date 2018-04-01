import React from 'react'
import { loadModules } from 'esri-loader'

class EsriMap extends React.Component {
  componentDidMount() {
    this.createMap()
  }
  createMap() {
    const { layers, esriMap: { zoom, center } } = this.props
    const selectedIds = layers
      .filter(layer => layer.selected)
      .map(layer => layer.id)

    loadModules(['esri/views/MapView', 'esri/Map', 'esri/layers/Layer']).then(
      ([MapView, Map, Layer]) => {
        const webmap = new Map({
          basemap: 'topo'
        })
        const view = new MapView({
          map: webmap,
          container: 'viewDiv',
          zoom: zoom,
          center: center
        })
        selectedIds.forEach(id => {
          Layer.fromPortalItem({
            portalItem: {
              id: id
            }
          }).then(function(layer) {
            webmap.add(layer)
          })
        })
      }
    )
  }
  render() {
    return (
      <div id="viewDiv" style={{ height: `calc(100vh - 8em)`, width: '100' }} />
    )
  }
}

export default EsriMap
