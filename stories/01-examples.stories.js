import React from 'react';
import {storiesOf} from '@storybook/react';

import React3DGlobe from './../src';
import App from './src/App';
import TexturesExample from './src/TexturesExample';
import RadiusExample from './src/RadiusExample';

storiesOf('Basic Examples', module)
  .add('No props', () => (
    <App title="No props" description="Barebones and simple globe">
      <React3DGlobe />
    </App>
  ))
  .add('Radius Size', () => (
    <App title="Radius Size" description="Set globe radius size">
      <RadiusExample />
    </App>
  ))
  .add('Textures', () => (
    <App title="Textures" description="Select and apply different textures">
      <TexturesExample />
    </App>
  ));
