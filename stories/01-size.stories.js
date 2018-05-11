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
  .add('Inferred Size', () => (
    <App
      title="Inherit Size"
      description="Canvas will inherit fixed size from parent div">
      <div style={{height: 300, width: 800}}>
        <React3DGlobe />
      </div>
    </App>
  ))
  .add('Responsive Size', () => (
    <App title="Responsive Sive" description="Resizes if parent div is resized">
      <div style={{height: '100vh', width: '100vw'}}>
        <React3DGlobe />
      </div>
    </App>
  ));
