import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import DefaultGlobe from './src/DefaultGlobe';
import MarkerEventsExample from './src/MarkerEventsExample';
import {getMockData} from './src/mockData';

const pointMarkers = getMockData(0xffff00, 'point');
const barMarkers = getMockData(0xffff00, 'bar');

storiesOf('Data and Markers', module)
  .add('Point Markers', () => (
    <App
      title="Point Markers"
      description="Render data as points on the globe ">
      <DefaultGlobe markers={pointMarkers} />
    </App>
  ))
  .add('Bar Markers', () => (
    <App title="Bar Markers" description="Render data as bars on the globe">
      <DefaultGlobe markers={barMarkers} />
    </App>
  ))
  .add('Hover and Click Events', () => (
    <App
      title="Hover and Click Events"
      description="Bind hover and click events for markers">
      <MarkerEventsExample markers={barMarkers} />
    </App>
  ));
