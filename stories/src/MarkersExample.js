import React from 'react';

import React3DGlobe from './../../src';
import data from './data';

export default class MarkersExample extends React.Component {
  render() {
    return (
      <div>
        <React3DGlobe markers={data} />
      </div>
    );
  }
}
