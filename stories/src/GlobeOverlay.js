import React from 'react';

export default ({globe, overlayContents}) => (
  <div style={{position: 'relative', height: '100%', width: '100%'}}>
    <div style={{height: '100%', width: '100%'}}>{globe}</div>
    <div
      style={{
        background: 'white',
        bottom: 0,
        fontSize: 12,
        opacity: 0.7,
        padding: 8,
        position: 'absolute',
        right: 0,
        top: 0,
        width: 200,
      }}>
      {overlayContents}
    </div>
  </div>
);
