import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import TexturesExample from './src/TexturesExample';

storiesOf('Textures', module).add('Globe and Space', () => (
  <App
    title="Globe and Space"
    description="Select and apply different globe and space textures">
    <TexturesExample />
  </App>
));
