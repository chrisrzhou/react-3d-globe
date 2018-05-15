import React from 'react';
import {storiesOf} from '@storybook/react';

import App from './src/App';
import DefaultGlobe from './src/DefaultGlobe';

storiesOf('Size', module)
  .add('No props', () => (
    <App title="No props" description="Canvas stretches to parent div">
      <DefaultGlobe />
    </App>
  ))
  .add('Fixed Size', () => (
    <App
      title="Fixed Size"
      description="Explicitly set canvas size using props">
      <DefaultGlobe height={400} width={600} />
    </App>
  ))
  .add('Responsive Size', () => (
    <App title="Responsive Sive" description="Resizes if parent div is resized">
      <div style={{height: '100vh', width: '100vw'}}>
        <DefaultGlobe />
      </div>
    </App>
  ));
