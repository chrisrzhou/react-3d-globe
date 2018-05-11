import React from 'react';
import {Button, ButtonOutline, Group, Label} from 'rebass';

import React3DGlobe from './../../src';
import backgroundDefault from './textures/background-default.jpg';
import backgroundTree from './textures/background-tree.jpg';
import backgroundPlanets from './textures/background-planets.jpg';
import globeCityLights from './textures/globe-city-lights.jpg';
import globeColorful from './textures/globe-colorful.jpg';
import globeDark from './textures/globe-dark.jpg';
import globeDefault from './textures/globe-default.jpg';
import globeDotted from './textures/globe-dotted.png';
import globeGray from './textures/globe-gray.png';

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
];

const backgroundTextures = [
  {
    value: backgroundDefault,
    label: 'default',
  },
  {
    value: backgroundTree,
    label: 'tree',
  },
  {
    value: backgroundPlanets,
    label: 'planets',
  },
];

const ButtonGroup = ({label, options, selectedValue, onButtonClick}) => (
  <Group mb={4}>
    <Label>{label}</Label>
    {options.map(option => {
      const ButtonComponent =
        option.value === selectedValue ? Button : ButtonOutline;
      return (
        <ButtonComponent
          children={option.label}
          onClick={() => onButtonClick(option.value)}
        />
      );
    })}
  </Group>
);

export default class TexturesExample extends React.Component {
  state = {
    selectedGlobeTexture: globeTextures[0].value,
    selectedBackgroundTexture: backgroundTextures[0].value,
  };

  render() {
    const {selectedBackgroundTexture, selectedGlobeTexture} = this.state;
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
          options={backgroundTextures}
          selectedValue={selectedBackgroundTexture}
          onButtonClick={value => {
            this.setState({selectedBackgroundTexture: value});
          }}
        />
        <React3DGlobe
          backgroundTexture={selectedBackgroundTexture}
          globeTexture={selectedGlobeTexture}
        />
      </div>
    );
  }
}
