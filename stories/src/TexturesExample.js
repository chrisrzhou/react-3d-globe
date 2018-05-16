import React from 'react';
import {Button, ButtonOutline, Group, Label} from 'rebass';

import DefaultGlobe from './DefaultGlobe';
import spaceDefault from './textures/space-default.jpg';
import spaceGalaxy from './textures/space-galaxy.png';
import spacePlanet from './textures/space-planet.jpg';
import spaceWhite from './textures/space-white.png';
import globeCityLights from './textures/globe-city-lights.jpg';
import globeColorful from './textures/globe-colorful.jpg';
import globeDark from './textures/globe-dark.jpg';
import globeDefault from './textures/globe-default.jpg';
import globeDotted from './textures/globe-dotted.png';
import globeGray from './textures/globe-gray.png';
import globeBlue from './textures/globe-blue.png';
import globeBlueInverse from './textures/globe-blue-inverse.png';

const globeTextures = [
  {
    value: globeDefault,
    label: 'default',
  },
  {
    value: globeCityLights,
    label: 'city lights',
  },
  {
    value: globeDotted,
    label: 'dotted',
  },
  {
    value: globeGray,
    label: 'gray',
  },
  {
    value: globeDark,
    label: 'dark',
  },
  {
    value: globeColorful,
    label: 'colorful',
  },
  {
    value: globeBlue,
    label: 'blue',
  },
  {
    value: globeBlueInverse,
    label: 'blue inverse',
  },
];

const spaceTextures = [
  {
    value: spaceDefault,
    label: 'default',
  },
  {
    value: spaceGalaxy,
    label: 'galaxy',
  },
  {
    value: spacePlanet,
    label: 'planet',
  },
  {
    value: spaceWhite,
    label: 'white',
  },
];

const ButtonGroup = ({label, options, selectedValue, onButtonClick}) => (
  <Group mb={4}>
    <Label>{label}</Label>
    {options.map(({value, label}) => {
      const ButtonComponent = value === selectedValue ? Button : ButtonOutline;
      return (
        <ButtonComponent
          key={value}
          children={label}
          onClick={() => onButtonClick(value)}
        />
      );
    })}
  </Group>
);

export default class TexturesExample extends React.Component {
  state = {
    selectedGlobeTexture: globeTextures[0].value,
    selectedSpaceTexture: spaceTextures[0].value,
  };

  render() {
    const {selectedSpaceTexture, selectedGlobeTexture} = this.state;
    return (
      <div>
        <ButtonGroup
          label="Globe Texture"
          options={globeTextures}
          selectedValue={selectedGlobeTexture}
          onButtonClick={value => {
            this.setState({selectedGlobeTexture: value});
          }}
        />
        <ButtonGroup
          label="Background Texture"
          options={spaceTextures}
          selectedValue={selectedSpaceTexture}
          onButtonClick={value => {
            this.setState({selectedSpaceTexture: value});
          }}
        />
        <DefaultGlobe
          key={`${selectedGlobeTexture}_${selectedSpaceTexture}`}
          globeTexture={selectedGlobeTexture}
          spaceTexture={selectedSpaceTexture}
        />
      </div>
    );
  }
}
