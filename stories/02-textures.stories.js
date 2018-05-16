import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import DefaultGlobe from './src/DefaultGlobe';
import TexturesExample from './src/TexturesExample';
import {getDefaultOptions} from './../src';

const defaultOptions = getDefaultOptions();

storiesOf('Textures', module)
  .add('Globe and Space', () => (
    <App
      title="Globe and Space"
      description="Select and apply different globe and space textures">
      <TexturesExample />
    </App>
  ))
  .add('Low Poly Texture', () => (
    <App title="Low Poly Texture" description="Render globe in low-poly style">
      <DefaultGlobe
        options={{
          ...defaultOptions,
          globe: {...defaultOptions.globe, type: 'low-poly'},
        }}
      />
    </App>
  ));
