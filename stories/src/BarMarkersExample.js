import React from 'react';

import React3DGlobe from './../../src';
import {cities} from './data';

export default class BarMarkersExample extends React.Component {
  render() {
    const markers = cities.filter(city => parseInt(city.rank, 10) <= 300)
      .map(city => ({
        lat: city.latitude, 
        long: city.longitude,
        value: parseInt(city.population, 10),
        color: 0xffff00,
        type: 'bar',
    }));
    return (
      <div>
        <React3DGlobe markers={markers} />
      </div>
    );
  }
}

