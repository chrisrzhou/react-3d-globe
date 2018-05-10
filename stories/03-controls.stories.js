import React from 'react';
import {storiesOf} from '@storybook/react';

import React3DGlobe from './../src';
import App from './src/App';

storiesOf('Controls', module)
  .add('Frozen Globe', () => (
    <App title="Frozen Globe" description="Disabling all camera controls">
      <React3DGlobe />
    </App>
  ))
  .add('Tween Animation', () => (
    <App
      title="Tween Animation"
      description="Tweak and tween the rotation/zoom animations">
      <React3DGlobe />
    </App>
  ));
