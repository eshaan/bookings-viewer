import React from 'react';
import styled from 'styled-components';
import adsloLogo from '../../assets/images/adslot-squarelogo.png';
import theme from '../../constants/theme';

const Wrapper = styled.div`
  margin-bottom: ${theme.space.eightX};
`;

const StyledImage = styled.img`
  height: 30px;
`;

const Logo = () => {
  return (
    <Wrapper>
      <StyledImage src={adsloLogo} alt="AdlsotBookingsPortal"></StyledImage>
    </Wrapper>
  );
};

export default Logo;
