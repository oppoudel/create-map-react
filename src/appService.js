import { searchItems } from '@esri/arcgis-rest-items';
import shortid from 'shortid';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://create-map-e758c.firebaseio.com/',
});

export const appService = {
  getFeatures() {
    return new Promise(resolve => {
      searchItems({
        searchForm: {
          q: 'group: "1478688468f14058863b246e1d7c6be0"',
          num: 100,
          sortField: 'title',
        },
      }).then(response => {
        resolve(response.results);
      });
    });
  },
};

export const mapId = shortid.generate();

export default instance;
