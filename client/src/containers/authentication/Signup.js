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
      requiredName: false,
      email: '',
      validEmail: true,
      requiredEmail: false,
      password: '',
      repeatPassword: '',
      requiredPassword: false,
      passwordMatch: true,
      requiredRepeatPassword: false,
    };
  }

  onChangeHandler(key, value) {
    let {
      validEmail,
      passwordMatch,
      requiredEmail,
      requiredName,
      requiredPassword,
      requiredRepeatPassword,
    } = this.state;
    const { error, resetErrors } = this.props;

    if (error) {
      resetErrors();
    }

    if (key === 'email') {
      requiredEmail = false;
      if (!isValidEmail(value)) {
        validEmail = false;
      } else {
        validEmail = true;
      }
    }

    if (key === 'name') {
      requiredName = false;
    }

    if (key === 'password') {
      requiredPassword = false;
    }

    if (key === 'repeatPassword') {
      requiredRepeatPassword = false;
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
      requiredEmail,
      requiredName,
      requiredPassword,
      requiredRepeatPassword,
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
      requiredEmail,
      requiredName,
      requiredPassword,
      requiredRepeatPassword,
    } = this.state;
    const {
      signup,
      error,
      navigate,
    } = this.props;

    return (
      <Wrapper>
        <FormContent id="signup-form-content">
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
              name="name"
              placeholder="Full name"
              value={name}
              onChange={(e) => {
                this.onChangeHandler('name', e.target.value);
              }}
            />
            <ValidationLabel
              name={requiredName && 'required-name'}
              invalid={requiredName}
            >
              Name is required
            </ValidationLabel>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              invalid={!validEmail}
              value={email}
              onChange={(e) => {
                this.onChangeHandler('email', e.target.value);
              }}
            />
            <ValidationLabel invalid={!validEmail}>Email is incorrect</ValidationLabel>
            <ValidationLabel
              name={requiredEmail && 'required-email'}
              invalid={requiredEmail}
            >
              Email is required
            </ValidationLabel>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                this.onChangeHandler('password', e.target.value);
              }}
            />
            <ValidationLabel
              name={requiredPassword && 'required-password'}
              invalid={requiredPassword}
            >
              Password is required
            </ValidationLabel>
            <Input
              type="password"
              name="repeat-password"
              placeholder="Repeat password"
              invalid={!passwordMatch}
              value={repeatPassword}
              onChange={(e) => {
                this.onChangeHandler('repeatPassword', e.target.value);
              }}
            />
            <ValidationLabel invalid={!passwordMatch || requiredRepeatPassword}>
              Password is not the same
            </ValidationLabel>
            <SubmitButton
              disabled={!passwordMatch || !validEmail}
              id="signup-submit"
              onClick={() => {
                if (!name || !email || !password || !repeatPassword) {
                  this.setState({
                    requiredName: !name,
                    requiredEmail: !email,
                    requiredPassword: !password,
                    requiredRepeatPassword: !repeatPassword,
                  });
                } else {
                  signup(name, email, password)
                    .then(() => {
                      navigate('/');
                    })
                    .catch(() => {
                      this.setState({
                        email: '',
                      });
                    });
                }
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
  navigate: PropTypes.func.isRequired,
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
