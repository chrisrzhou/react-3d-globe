import React from 'react';
import {Heading, Provider, Subhead} from 'rebass';

const App = ({children, description, title}) => (
  <Provider>
    <Heading>{title}</Heading>
    <Subhead color="#aaa" mb={2}>
      {description}
    </Subhead>
    {children}
  </Provider>
);

export default App;
