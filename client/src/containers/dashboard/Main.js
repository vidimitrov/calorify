import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import logo from '../../assets/img/logo.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #e1c777;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  font-weight: bold;
  color: black;
`;

const Logo = styled.img.attrs({
  alt: 'logo',
})`
  animation: ${rotate} infinite 20s linear;
  height: 40vmin;
  src: url(${props => props.src});
`;

const Headline = styled.p`
  color: #000000;
  font-weight: bold;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;

export const Main = () => (
  <Wrapper>
    <Header>
      <Logo src={logo} />
      <Headline>
        Calorify - track your daily calories
      </Headline>
      <CustomLink to="auth/login">
        <Button variant="contained" color="primary">
          Login
        </Button>
      </CustomLink>
    </Header>
  </Wrapper>
);

export default Main;
