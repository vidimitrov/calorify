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
      password: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(key, value) {
    let { validEmail } = this.state;
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

    this.setState({
      validEmail,
      [key]: value,
    });
  }

  render() {
    const { login, error, navigate } = this.props;
    const { email, password, validEmail } = this.state;
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
              invalid={!validEmail}
              onChange={e => this.onChangeHandler('email', e.target.value)}
            />
            <ValidationLabel invalid={!validEmail}>Email is incorrect</ValidationLabel>
            <Input
              type="password"
              name="login"
              placeholder="Password"
              onChange={e => this.onChangeHandler('password', e.target.value)}
            />
            <SubmitButton
              disabled={!validEmail}
              onClick={() => {
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
              }}
            >
              Log In
            </SubmitButton>
            <SecondaryAction>
              <Anchor to="/auth/signup"> Create an account</Anchor>
            </SecondaryAction>
          </div>

          {/*
            TODO: Add "forgot password" functionality in case there is any time left

            <FormFooter id="formFooter">
              <Anchor to="/auth/forgot-password"> Forgot Password?</Anchor>
            </FormFooter>
          */}

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
