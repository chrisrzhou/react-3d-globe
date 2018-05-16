import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import DefaultGlobe from './src/DefaultGlobe';
import {getDefaultOptions} from './../src';

const defaultOptions = getDefaultOptions();

storiesOf('Controls', module).add('Frozen Globe', () => (
  <App title="Freeze Globe" description="Disabling all camera controls">
    <DefaultGlobe
      options={{
        ...defaultOptions,
        orbitControls: {
          ...defaultOptions.orbitControls,
          autoRotate: false,
          enablePan: false,
          enableZoom: false,
          enableRotate: false,
        },
      }}
    />
  </App>
));
