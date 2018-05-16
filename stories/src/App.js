import React from 'react';
import {Flex, Heading, Provider, Subhead} from 'rebass';

const App = ({children, description, title}) => (
  <Provider style={{height: '100%', width: '100%', overflow: 'hidden'}}>
    <Flex direction="column" style={{height: '100%', width: '100%'}}>
      <div style={{flexShrink: 0}}>
        <Heading>{title}</Heading>
        <Subhead color="#aaa" mb={4}>
          {description}
        </Subhead>
      </div>
      {children}
    </Flex>
  </Provider>
);

export default App;
