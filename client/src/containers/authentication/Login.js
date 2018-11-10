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
import { login as loginActionCreator, resetErrors as resetErrorsAction } from '../../actions/authentication';
import { isValidEmail } from '../../lib/validations';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      validEmail: true,
      requiredEmail: false,
      password: '',
      requiredPassword: false,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(key, value) {
    let { validEmail, requiredEmail, requiredPassword } = this.state;
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

    if (key === 'password') {
      requiredPassword = false;
    }

    this.setState({
      validEmail,
      requiredEmail,
      requiredPassword,
      [key]: value,
    });
  }

  render() {
    const { login, error, navigate } = this.props;
    const {
      email,
      password,
      validEmail,
      requiredEmail,
      requiredPassword,
    } = this.state;
    return (
      <Wrapper>
        <FormContent id="formContent">
          <FormHeader>
            <Image src={logo} alt="Calorify Logo" />
            <h1>Calorify</h1>
          </FormHeader>

          <div>
            <ValidationLabel
              invalid={error && error.statusCode === 400}
            >
              The email or password you entered is incorrect
            </ValidationLabel>
            <Input
              type="text"
              name="login"
              placeholder="Email"
              invalid={!validEmail || requiredEmail}
              onChange={e => this.onChangeHandler('email', e.target.value)}
            />
            <ValidationLabel invalid={!validEmail}>Email is incorrect</ValidationLabel>
            <ValidationLabel invalid={requiredEmail}>Email is required</ValidationLabel>
            <Input
              type="password"
              name="login"
              placeholder="Password"
              invalid={requiredPassword}
              onChange={e => this.onChangeHandler('password', e.target.value)}
            />
            <ValidationLabel invalid={requiredPassword}>Password is required</ValidationLabel>
            <SubmitButton
              disabled={!validEmail}
              onClick={() => {
                if (!email || !password) {
                  this.setState({
                    requiredEmail: !email,
                    requiredPassword: !password,
                  });
                } else {
                  login(email, password)
                    .then(() => {
                      navigate('/');
                    })
                    .catch(() => {
                      this.setState({
                        email: '',
                        password: '',
                        validEmail: true,
                      });
                    });
                }
              }}
            >
              Log In
            </SubmitButton>
            <SecondaryAction>
              <Anchor to="/auth/signup"> Create an account</Anchor>
            </SecondaryAction>
          </div>
        </FormContent>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  resetErrors: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
    statusCode: PropTypes.number,
    success: PropTypes.bool,
  }),
};

Login.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginActionCreator(email, password)),
  resetErrors: () => dispatch(resetErrorsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
