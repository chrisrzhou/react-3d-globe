import React from 'react';
import {storiesOf} from '@storybook/react';

import React3DGlobe from './../src';
import App from './src/App';

storiesOf('Data and Markers', module)
  .add('Point Markers', () => (
    <App
      title="Point Markers"
      description="Render data as points on the globe ">
      <React3DGlobe />
    </App>
  ))
  .add('Bar Markers', () => (
    <App title="Bar Markers" description="Render data as bars on the globe">
      <React3DGlobe />
    </App>
  ));
