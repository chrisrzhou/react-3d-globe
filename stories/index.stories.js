import React from 'react';
import {storiesOf} from '@storybook/react';

import React3DGlobe from './../src';

storiesOf('Welcome', module).add('to Storybook', () => <div>Welcome</div>);

storiesOf('Basic Examples', module).add('No props', () => <React3DGlobe />);
