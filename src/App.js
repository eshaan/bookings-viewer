import React, { Component, Fragment } from 'react';
import Logo from '../src/components/Logo/Logo';
import Bookings from '../src/views/Bookings';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 800px;
  max-width: 1200px;
  padding: 50px 50px 0px 50px;
  margin: auto auto 20px;
  vertical-align: top;
`;

class App extends Component {
  render() {
    return (
      <FlexContainer>
        <Logo />
        <Bookings />
      </FlexContainer>
    );
  }
}

export default App;
