import React from 'react';
import logo from '../../assets/img/logo.png';
import Wrapper from '../../components/authentication/Wrapper';
import FormHeader from '../../components/authentication/FormHeader';
import FormContent from '../../components/authentication/FormContent';
import SecondaryAction from '../../components/authentication/SecondaryAction';
import Input from '../../components/authentication/Input';
import SubmitButton from '../../components/authentication/SubmitButton';
import Anchor from '../../components/authentication/Anchor';
import Image from '../../components/authentication/Image';

export const Signup = () => (
  <Wrapper>
    <FormContent id="formContent">
      <FormHeader>
        <Image src={logo} alt="Calorify Logo" />
        <h1>Calorify</h1>
      </FormHeader>

      <form>
        <Input type="text" name="signup" placeholder="Full name" />
        <Input type="text" name="signup" placeholder="Email" />
        <Input type="password" name="signup" placeholder="Password" />
        <Input type="password" name="signup" placeholder="Repeat password" />
        <SubmitButton type="submit" value="Sign Up" />
        <SecondaryAction>
          <Anchor to="/auth/login">Log in</Anchor>
        </SecondaryAction>
      </form>

    </FormContent>
  </Wrapper>
);

export default Signup;
