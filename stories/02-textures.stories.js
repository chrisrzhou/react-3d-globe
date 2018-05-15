import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import DefaultGlobe from './src/DefaultGlobe';
import TexturesExample from './src/TexturesExample';
import options from './../src/defaults/options';

storiesOf('Textures', module)
  .add('Globe and Space', () => (
    <App
      title="Globe and Space"
      description="Select and apply different globe and space textures">
      <TexturesExample />
    </App>
  ))
  .add('Low Poly Texture', () => (
    <App
      title="Low Poly Texture"
      description="Render globe with a polygonal style">
      <DefaultGlobe
        options={{...options, globe: {...options.globe, type: 'low-poly'}}}
      />
    </App>
  ));
