import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import DefaultGlobe from './src/DefaultGlobe';
import DisableUnfocusExample from './src/DisableUnfocusExample';
import MarkerEventsExample from './src/MarkerEventsExample';
import UpdateMarkersExample from './src/UpdateMarkersExample';
import {getMockData} from './src/mockData';

const pointMarkers = getMockData(0x8c72cb, 'point');
const barMarkers = getMockData(0x8c72cb, 'bar');

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
      <MarkerEventsExample markers={pointMarkers} />
    </App>
  ))
  .add('Disable Unfocus', () => (
    <App
      title="Disable Unfocus"
      description="Disable default unfocus click event and control it from parent component">
      <DisableUnfocusExample markers={pointMarkers} />
    </App>
  ))
  .add('Update markers', () => (
    <App
      title="Update markers"
      description="Update transitions when marker data is updated">
      <UpdateMarkersExample />
    </App>
  ));
