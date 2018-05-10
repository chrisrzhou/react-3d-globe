import React from 'react';
import {storiesOf} from '@storybook/react';

import React3DGlobe from './../src';
import App from './src/App';

storiesOf('Interactive', module).add('#metoo', () => (
  <App
    title="#metoo"
    description="Inspired by https://metoorising.withgoogle.com/">
    <React3DGlobe />
  </App>
));
