import React from 'react';
import {storiesOf} from '@storybook/react';

import React3DGlobe from './../src';
import App from './src/App';

storiesOf('Size', module)
  .add('No props', () => (
    <App title="No props" description="Canvas stretches to parent div">
      <React3DGlobe />
    </App>
  ))
  .add('Fixed Size', () => (
    <App
      title="Fixed Size"
      description="Explicitly set canvas size using props">
      <React3DGlobe height={400} width={600} />
    </App>
  ))
  .add('Responsive Size', () => (
    <App title="Responsive Sive" description="Resizes if parent div is resized">
      <div style={{height: '100vh', width: '100vw'}}>
        <React3DGlobe />
      </div>
    </App>
  ));
