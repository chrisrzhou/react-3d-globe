import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import DefaultGlobe from './src/DefaultGlobe';
import options from './../src/defaults/options';

storiesOf('Controls', module).add('Frozen Globe', () => (
  <App title="Freeze Globe" description="Disabling all camera controls">
    <DefaultGlobe
      options={{
        ...options,
        orbitControls: {
          ...options.orbitControls,
          autoRotate: false,
          enablePan: false,
          enableZoom: false,
          enableRotate: false,
        },
      }}
    />
  </App>
));
