import React from 'react';

import React3DGlobe from './../../src';
import globeTexture from './../../src/textures/globe.jpg';
import spaceTexture from './../../src/textures/space.jpg';

export default props => (
  <React3DGlobe
    globeTexture={globeTexture}
    spaceTexture={spaceTexture}
    {...props}
  />
);
