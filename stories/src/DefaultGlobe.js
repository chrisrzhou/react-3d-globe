import React from 'react';

import React3DGlobe from './../../src';
import globeTexture from './../../src/textures/globe.jpg';
import spaceTexture from './../../src/textures/space.png';
import cloudTexture from './../../src/textures/cloud.png';

export default props => (
  <React3DGlobe
    globeTexture={globeTexture}
    spaceTexture={spaceTexture}
    cloudTexture={cloudTexture}
    {...props}
  />
);
