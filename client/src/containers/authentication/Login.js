import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login as loginActionCreator } from '../../actions/authentication';

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

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const { login, navigate } = this.props;
    const { email, password } = this.state;
    return (
      <Wrapper>
        <FormContent id="formContent">
          <FormHeader>
            <Image src={logo} alt="Calorify Logo" />
            <h1>Calorify</h1>
          </FormHeader>

          <div>
            <Input
              type="text"
              name="login"
              placeholder="Email"
              onChange={e => this.onChangeHandler('email', e.target.value)}
            />
            <Input
              type="password"
              name="login"
              placeholder="Password"
              onChange={e => this.onChangeHandler('password', e.target.value)}
            />
            <SubmitButton
              onClick={() => {
                login(email, password)
                  .then(() => navigate('/'))
                  .catch((err) => {
                    throw err;
                  });
              }}
            >
              Log In
            </SubmitButton>
            <SecondaryAction>
              <Anchor to="/auth/signup"> Create an account</Anchor>
            </SecondaryAction>
          </div>

          <FormFooter id="formFooter">
            <Anchor to="/auth/forgot-password"> Forgot Password?</Anchor>
          </FormFooter>

        </FormContent>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginActionCreator(email, password)),
});

export default connect(null, mapDispatchToProps)(Login);
