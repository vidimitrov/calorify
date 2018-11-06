import React from 'react';
// import PropsTypes from 'prop-types';
import logo from '../../assets/img/logo.png';
import Wrapper from '../../components/authentication/Wrapper';
import FormHeader from '../../components/authentication/FormHeader';
import FormContent from '../../components/authentication/FormContent';
import FormFooter from '../../components/authentication/FormFooter';
import SecondaryAction from '../../components/authentication/SecondaryAction';
import Input from '../../components/authentication/Input';
import SubmitButton from '../../components/authentication/SubmitButton';
import Anchor from '../../components/authentication/Anchor';
import Image from '../../components/authentication/Image';

export const Login = () => (
  <Wrapper>
    <FormContent id="formContent">
      <FormHeader>
        <Image src={logo} alt="Calorify Logo" />
        <h1>Calorify</h1>
      </FormHeader>

      <form>
        <Input type="text" name="login" placeholder="email" />
        <Input type="password" name="login" placeholder="password" />
        <SubmitButton type="submit" value="Log In" />
        <SecondaryAction>
          <Anchor to="/auth/signup"> Create an account</Anchor>
        </SecondaryAction>
      </form>

      <FormFooter id="formFooter">
        <Anchor to="/auth/forgot-password"> Forgot Password?</Anchor>
      </FormFooter>

    </FormContent>
  </Wrapper>
);

// Login.propTypes = {
//   navigate: PropsTypes.func.isRequired,
// };

export default Login;
