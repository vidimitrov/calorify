import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { signup as signupActionCreator } from '../../actions/authentication';
import { isValidEmail } from '../../lib/validations';

export class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      validEmail: true,
      password: '',
      passwordMatch: true,
    };
  }

  onChangeHandler(key, value) {
    let { validEmail, passwordMatch } = this.state;

    if (key === 'email') {
      if (!isValidEmail(value)) {
        validEmail = false;
      } else {
        validEmail = true;
      }
    }

    if (key === 'repeatPassword') {
      const { password } = this.state;
      if (password !== value) {
        passwordMatch = false;
      } else {
        passwordMatch = true;
      }
    }

    this.setState({
      validEmail,
      passwordMatch,
      [key]: value,
    });
  }

  render() {
    const {
      name,
      email,
      validEmail,
      password,
      passwordMatch,
    } = this.state;
    const {
      signup,
      navigate,
      authenticationError,
    } = this.props;

    return (
      <Wrapper>
        <FormContent id="formContent">
          <FormHeader>
            <Image src={logo} alt="Calorify Logo" />
            <h1>Calorify</h1>
          </FormHeader>

          <div>
            <ValidationLabel
              invalid={authenticationError && authenticationError.statusCode === 400}
            >
              The email or password you entered is incorrect
            </ValidationLabel>
            <Input
              type="text"
              name="signup"
              placeholder="Full name"
              onChange={(e) => {
                this.onChangeHandler('name', e.target.value);
              }}
            />
            <Input
              type="text"
              name="signup"
              placeholder="Email"
              invalid={!validEmail}
              onChange={(e) => {
                this.onChangeHandler('email', e.target.value);
              }}
            />
            <ValidationLabel invalid={!validEmail}>Email is incorrect</ValidationLabel>
            <Input
              type="password"
              name="signup"
              placeholder="Password"
              onChange={(e) => {
                this.onChangeHandler('password', e.target.value);
              }}
            />
            <Input
              type="password"
              name="signup"
              placeholder="Repeat password"
              invalid={!passwordMatch}
              onChange={(e) => {
                this.onChangeHandler('repeatPassword', e.target.value);
              }}
            />
            <ValidationLabel invalid={!passwordMatch}>Password is not the same</ValidationLabel>
            <SubmitButton
              onClick={() => {
                signup(name, email, password)
                  .then(() => {
                    navigate('/');
                  });
              }}
            >
              Sign Up
            </SubmitButton>
            <SecondaryAction>
              <Anchor to="/auth/login">Log in</Anchor>
            </SecondaryAction>
          </div>

        </FormContent>
      </Wrapper>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  authenticationError: PropTypes.shape({
    message: PropTypes.string,
    statusCode: PropTypes.number,
    success: PropTypes.bool,
  }),
};

Signup.defaultProps = {
  authenticationError: null,
};

const mapStateToProps = state => ({
  authenticationError: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  signup: (name, email, password) => dispatch(signupActionCreator({ name, email, password })),
});


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
