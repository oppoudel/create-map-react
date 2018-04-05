import React, { Fragment } from 'react';
import { loadModules } from 'esri-loader';
import { Input } from 'semantic-ui-react';
import base from '../base';
import Header from './Header';

class EsriMap extends React.Component {
  state = {
    esriMap: {
      center: [-76.615, 39.289],
      zoom: 12,
      title: 'Give Your Map a Title',
    },
  };
  componentDidMount() {
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.mapId}/esriMap`, {
      context: this,
      state: 'esriMap',
    });

    base.fetch(`${params.mapId}/layers`, {
      context: this,
      then(data) {
        this.createMap(data);
      },
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  createMap(data) {
    const layers = data || this.props.layers;
    const selectedIds = layers
      .filter(layer => layer.selected)
      .map(layer => layer.id);
    const { esriMap: { zoom, center } } = this.state;
    loadModules([
      'esri/views/MapView',
      'esri/Map',
      'esri/layers/Layer',
      'esri/widgets/Expand',
      'esri/widgets/Legend',
      'esri/widgets/LayerList',
      'esri/widgets/Search',
      'esri/core/watchUtils',
    ]).then(
      ([
        MapView,
        Map,
        Layer,
        Expand,
        Legend,
        LayerList,
        Search,
        watchUtils,
      ]) => {
        const webmap = new Map({
          basemap: 'topo',
        });
        const view = new MapView({
          map: webmap,
          container: 'viewDiv',
          zoom: zoom,
          center: center,
        });
        selectedIds.forEach(id => {
          Layer.fromPortalItem({
            portalItem: {
              id: id,
            },
          }).then(function(layer) {
            webmap.add(layer);
          });
        });
        view.then(() => {
          const legend = new Legend({
            view: view,
            container: document.createElement('div'),
          });
          const layerList = new LayerList({
            view: view,
            container: document.createElement('div'),
          });
          const legendExpand = new Expand({
            view: view,
            content: legend.domNode,
            expandIconClass: 'esri-icon-collection',
            expandTooltip: 'Legend',
          });
          const layersExpand = new Expand({
            view: view,
            content: layerList.domNode,
            expandIconClass: 'esri-icon-layer-list',
            expandTooltip: 'Layers',
          });
          view.ui.add(layersExpand, 'top-right');
          view.ui.add(legendExpand, 'top-right');
        });
        const searchWidget = new Search({
          view: view,
        });
        view.ui.add(searchWidget, {
          position: 'top-left',
          index: 0,
        });
        watchUtils.whenTrue(view, 'stationary', () => {
          let center = [
            view.center.longitude.toFixed(3),
            view.center.latitude.toFixed(3),
          ];
          let zoom = view.zoom;
          this.setState(prevState => ({
            esriMap: { ...prevState.esriMap, center, zoom },
          }));
        });
      },
    );
  }
  render() {
    let { title } = this.state.esriMap;
    return (
      <Fragment>
        <Header>
          <Input value={title} />
        </Header>
        <div
          id="viewDiv"
          style={{
            height: `calc(100vh - 8em)`,
            width: '100',
            marginTop: '4em',
          }}
        />
      </Fragment>
    );
  }
}

export default EsriMap;
