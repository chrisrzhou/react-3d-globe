import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import MarkersExample from './src/MarkersExample';

storiesOf('Data and Markers', module)
  .add('Point Markers', () => (
    <App
      title="Point Markers"
      description="Render data as points on the globe ">
      <MarkersExample />
    </App>
  ))
  .add('Bar Markers', () => (
    <App title="Bar Markers" description="Render data as bars on the globe">
      <MarkersExample />
    </App>
  ));
