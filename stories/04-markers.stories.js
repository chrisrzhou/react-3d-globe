import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import PointMarkersExample from './src/PointMarkersExample';
import BarMarkersExample from './src/BarMarkersExample';

storiesOf('Data and Markers', module)
  .add('Point Markers', () => (
    <App
      title="Point Markers"
      description="Render data as points on the globe ">
      <PointMarkersExample />
    </App>
  ))
  .add('Bar Markers', () => (
    <App title="Bar Markers" description="Render data as bars on the globe">
      <BarMarkersExample />
    </App>
  ));
