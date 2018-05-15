import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import DefaultGlobe from './src/DefaultGlobe';
import {cities} from './src/data';

export const getMarkers = (type, color) => {
	return cities
		.filter(city => parseInt(city.rank, 10) <= 300)
		.map(city => ({
			lat: city.latitude,
			long: city.longitude,
			value: parseInt(city.population, 10),
			color,
			type,
		}));
}

storiesOf('Data and Markers', module)
  .add('Point Markers', () => (
    <App
      title="Point Markers"
      description="Render data as points on the globe ">
      <DefaultGlobe markers={getMarkers('point', 0xfc64ba)} />
    </App>
  ))
  .add('Bar Markers', () => (
    <App title="Bar Markers" description="Render data as bars on the globe">
      <DefaultGlobe markers={getMarkers('bar', 0xffff00)} />
    </App>
  ));
