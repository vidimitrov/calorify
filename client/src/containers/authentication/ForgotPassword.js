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
import ValidationLabel from '../../components/authentication/ValidationLabel';

export const ForgotPassword = () => (
  <Wrapper>
    <FormContent id="formContent">
      <FormHeader>
        <Image src={logo} alt="Calorify Logo" />
        <h1>Calorify</h1>
      </FormHeader>

      <form>
        <Input type="text" name="signup" placeholder="What's your email?" invalid />
        <ValidationLabel valid={false}>Emails is incorrect</ValidationLabel>
        <SubmitButton type="submit" value="Reset password" />
        <SecondaryAction>
          <Anchor to="/auth/login">Go back</Anchor>
        </SecondaryAction>
      </form>

    </FormContent>
  </Wrapper>
);

export default ForgotPassword;
