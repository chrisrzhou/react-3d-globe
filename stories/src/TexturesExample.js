import React from 'react';
import {Button, ButtonOutline, Group} from 'rebass';

import React3DGlobe from './../../src';
import cityLightsTexture from './textures/city-lights.jpg';
import colorfulTexture from './textures/colorful.jpg';
import darkTexture from './textures/dark.jpg';
import defaultTexture from './textures/default.jpg';
import dottedTexture from './textures/dotted.png';
import grayTexture from './textures/gray.png';

const textures = [
  {
    value: defaultTexture,
    label: 'default',
  },
  {
    value: cityLightsTexture,
    label: 'city lights',
  },
  {
    value: dottedTexture,
    label: 'dotted',
  },
  {
    value: grayTexture,
    label: 'gray',
  },
  {
    value: darkTexture,
    label: 'dark',
  },
  {
    value: colorfulTexture,
    label: 'colorful',
  },
];

export default class TexturesExample extends React.Component {
  state = {
    selectedTexture: textures[0].value,
  };

  render() {
    const {selectedTexture} = this.state;
    return (
      <div>
        <Group>
          {textures.map(texture => {
            const ButtonComponent =
              texture.value === selectedTexture ? Button : ButtonOutline;
            return (
              <ButtonComponent
                children={texture.label}
                onClick={() => {
                  this.setState({selectedTexture: texture.value});
                }}
              />
            );
          })}
        </Group>
        <React3DGlobe textureUrl={selectedTexture} />
      </div>
    );
  }
}
