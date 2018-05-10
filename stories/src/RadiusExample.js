import React from 'react';
import {Button, ButtonOutline, Group} from 'rebass';

import React3DGlobe from './../../src';

const sizes = [
  {
    value: 400,
    label: 'small (400)',
  },
  {
    value: undefined,
    label: 'default (600)',
  },
  {
    value: 1200,
    label: 'large (1200)',
  },
];

export default class RadiusExample extends React.Component {
  state = {
    selectedSize: undefined,
  };

  render() {
    const {selectedSize} = this.state;
    return (
      <div>
        <Group>
          {sizes.map(size => {
            const ButtonComponent =
              size.value === selectedSize ? Button : ButtonOutline;
            return (
              <ButtonComponent
                children={size.label}
                onClick={() => {
                  this.setState({selectedSize: size.value});
                }}
              />
            );
          })}
        </Group>
        <React3DGlobe radius={selectedSize} />
      </div>
    );
  }
}
