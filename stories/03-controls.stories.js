import React from 'react';
import {storiesOf} from '@storybook/react';

import React3DGlobe from './../src';
import App from './src/App';

storiesOf('Controls', module).add('Frozen Globe', () => (
  <App title="Freeze Globe" description="Disabling all camera controls">
    <React3DGlobe />
  </App>
));
