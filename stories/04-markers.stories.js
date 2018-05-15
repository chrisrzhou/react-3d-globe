import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import DefaultGlobe from './src/DefaultGlobe';
import {getMarkers} from './src/data';

storiesOf('Data and Markers', module)
  .add('Point Markers', () => (
    <App
      title="Point Markers"
      description="Render data as points on the globe ">
      <DefaultGlobe markers={getMarkers('point')} />
    </App>
  ))
  .add('Bar Markers', () => (
    <App title="Bar Markers" description="Render data as bars on the globe">
      <DefaultGlobe markers={getMarkers('bar')} />
    </App>
  ));
