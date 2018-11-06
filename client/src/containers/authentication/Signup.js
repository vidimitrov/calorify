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
import { signup as signupActionCreator, resetErrors as resetErrorsAction } from '../../actions/authentication';
import { isValidEmail } from '../../lib/validations';

export class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      validEmail: true,
      password: '',
      repeatPassword: '',
      passwordMatch: true,
    };
  }

  onChangeHandler(key, value) {
    let { validEmail, passwordMatch } = this.state;
    const { error, resetErrors } = this.props;

    if (error) {
      resetErrors();
    }

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
      repeatPassword,
      passwordMatch,
    } = this.state;
    const {
      signup,
      error,
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
              invalid={error && error.statusCode === 403}
            >
              Email is already taken
            </ValidationLabel>
            <Input
              type="text"
              name="signup"
              placeholder="Full name"
              value={name}
              onChange={(e) => {
                this.onChangeHandler('name', e.target.value);
              }}
            />
            <Input
              type="text"
              name="signup"
              placeholder="Email"
              invalid={!validEmail}
              value={email}
              onChange={(e) => {
                this.onChangeHandler('email', e.target.value);
              }}
            />
            <ValidationLabel invalid={!validEmail}>Email is incorrect</ValidationLabel>
            <Input
              type="password"
              name="signup"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                this.onChangeHandler('password', e.target.value);
              }}
            />
            <Input
              type="password"
              name="signup"
              placeholder="Repeat password"
              invalid={!passwordMatch}
              value={repeatPassword}
              onChange={(e) => {
                this.onChangeHandler('repeatPassword', e.target.value);
              }}
            />
            <ValidationLabel invalid={!passwordMatch}>Password is not the same</ValidationLabel>
            <SubmitButton
              disabled={!passwordMatch || !validEmail}
              onClick={() => {
                signup(name, email, password)
                  .then(() => {
                    navigate('/');
                  })
                  .catch(() => {
                    this.setState({
                      email: '',
                    });
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
  resetErrors: PropTypes.func.isRequired,
  // navigate: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    statusCode: PropTypes.number,
    success: PropTypes.bool,
  }),
};

Signup.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  signup: (name, email, password) => dispatch(signupActionCreator({ name, email, password })),
  resetErrors: () => dispatch(resetErrorsAction()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
