import React from 'react';
import Button from '@material-ui/core/Button';
import Wrapper from '../../components/dashboard/Wrapper';
import Header from '../../components/dashboard/Header';
import Logo from '../../components/dashboard/Logo';
import Headline from '../../components/dashboard/Headline';
import CustomLink from '../../components/dashboard/CustomLink';
import logo from '../../assets/img/logo.png';


export const Main = () => (
  <Wrapper>
    <Header>
      <Logo src={logo} />
      <Headline>
        Calorify - track your daily calories
      </Headline>
      <CustomLink to="auth/login">
        <Button variant="contained" color="default">
          Logout
        </Button>
      </CustomLink>
    </Header>
  </Wrapper>
);

export default Main;
