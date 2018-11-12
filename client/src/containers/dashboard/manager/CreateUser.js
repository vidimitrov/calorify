import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import { isEmpty } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import CustomSnackbar from '../../../components/common/CustomSnackbar';
import Form from '../../../components/dashboard/Form';
import FormControls from '../../../components/dashboard/FormControls';
import InputWrapper from '../../../components/dashboard/InputWrapper';
import Logo from '../../../components/dashboard/Logo';
import Wrapper from '../../../components/dashboard/Wrapper';
import CustomTypography from '../../../components/dashboard/CustomTypography';
import CustomIconButton from '../../../components/dashboard/CustomIconButton';
import CustomTextField from '../../../components/dashboard/CustomTextField';
import ValidationLabel from '../../../components/dashboard/ValidationLabel';
import logo from '../../../assets/img/logo.png';
import { createUser as createUserActionCreator } from '../../../actions/users';
import { isValidEmail } from '../../../lib/validations';

export class CreateUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      requiredName: false,
      requiredEmail: false,
      validEmail: true,
      requiredPassword: false,
      change: false,
      positiveSnackbarOpen: false,
      negativeSnackbarOpen: false,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handlePositiveSnackbarClose = this.handlePositiveSnackbarClose.bind(this);
    this.handleNegativeSnackbarClose = this.handleNegativeSnackbarClose.bind(this);
  }

  onChangeHandler(key, value) {
    let {
      requiredName,
      requiredEmail,
      validEmail,
      requiredPassword,
    } = this.state;

    if (key === 'name') {
      if (!value) {
        requiredName = true;
      } else {
        requiredName = false;
      }
    }

    if (key === 'email') {
      if (value && !isValidEmail(value)) {
        requiredEmail = false;
        validEmail = false;
      } else if (value) {
        requiredEmail = false;
        validEmail = true;
      } else {
        requiredEmail = true;
        validEmail = true;
      }
    }

    if (key === 'password') {
      if (!value) {
        requiredPassword = true;
      } else {
        requiredPassword = false;
      }
    }

    this.setState({
      change: true,
      requiredName,
      requiredEmail,
      requiredPassword,
      validEmail,
      [key]: value,
    });
  }

  handlePositiveSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ positiveSnackbarOpen: false });
  }

  handleNegativeSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ negativeSnackbarOpen: false });
  }

  render() {
    const {
      account,
      createUser,
    } = this.props;
    const {
      name,
      email,
      password,
      requiredName,
      requiredEmail,
      requiredPassword,
      validEmail,
      change,
      positiveSnackbarOpen,
      negativeSnackbarOpen,
    } = this.state;
    const { navigate } = this.props;

    if (!account) {
      return (
        <Redirect to="/auth/login" />
      );
    }

    return (
      <Wrapper data-testid="create-user-page">
        <AppBar position="static">
          <Toolbar>
            <CustomIconButton color="secondary" aria-label="Menu">
              <ArrowBack onClick={() => navigate('/users')} />
            </CustomIconButton>
            <Logo src={logo} alt="logo" />
            <CustomTypography variant="h6" color="secondary">
              Create User
            </CustomTypography>
          </Toolbar>
        </AppBar>
        <Form>
          <FormControls>
            <InputWrapper invalid={requiredName}>
              <CustomTextField
                placeholder="Full name"
                value={name}
                name="name"
                error={requiredName}
                onChange={e => this.onChangeHandler('name', e.target.value)}
              />
              <ValidationLabel
                name={requiredName ? 'required-name' : ''}
                invalid={requiredName}
              >
                Name is required
              </ValidationLabel>
            </InputWrapper>
            <InputWrapper invalid={requiredEmail}>
              <CustomTextField
                placeholder="Email"
                value={email}
                name="email"
                error={requiredEmail}
                onChange={e => this.onChangeHandler('email', e.target.value)}
              />
              <ValidationLabel
                name={requiredEmail ? 'required-email' : ''}
                invalid={requiredEmail}
              >
                Email is required
              </ValidationLabel>
              <ValidationLabel
                invalid={!validEmail}
              >
                Email is incorrect
              </ValidationLabel>
            </InputWrapper>
            <InputWrapper>
              <CustomTextField
                placeholder="Password"
                value={password}
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => this.onChangeHandler('password', e.target.value)}
              />
              <ValidationLabel
                name={requiredPassword ? 'required-password' : ''}
                invalid={requiredPassword}
              >
                Password is required
              </ValidationLabel>
            </InputWrapper>
          </FormControls>
          <Button
            variant="contained"
            color="primary"
            name="submit-create-user"
            disabled={!change}
            onClick={() => {
              if (!name || !email || !password || !validEmail) {
                this.setState({
                  requiredName: !name,
                  requiredEmail: !email,
                  requiredPassword: !password,
                });
              } else {
                createUser(name, email, password)
                  .then(() => {
                    this.setState({
                      positiveSnackbarOpen: true,
                    });
                    setTimeout(() => {
                      navigate('/users');
                    }, 1000);
                  }).catch(() => {
                    this.setState({
                      negativeSnackbarOpen: true,
                    });
                  });
              }
            }}
          >
            Create User
          </Button>
        </Form>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={positiveSnackbarOpen}
          autoHideDuration={1000}
          onClose={this.handlePositiveSnackbarClose}
        >
          <CustomSnackbar
            onClose={this.handlePositiveSnackbarClose}
            variant="success"
            message="User created successfully"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={negativeSnackbarOpen}
          autoHideDuration={1000}
          onClose={this.handleNegativeSnackbarClose}
        >
          <CustomSnackbar
            onClose={this.handleNegativeSnackbarClose}
            variant="error"
            message="Couldn\'t create user. Please try again"
          />
        </Snackbar>
      </Wrapper>
    );
  }
}

CreateUser.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dailyCaloriesLimit: PropTypes.number.isRequired,
  }),
  createUser: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

CreateUser.defaultProps = {
  account: null,
};

const mapStateToProps = state => ({
  account: isEmpty(state.account.data) ? null : state.account.data,
});

const mapDispatchToProps = dispatch => ({
  createUser: (name, email, password) => dispatch(
    createUserActionCreator({
      name,
      email,
      password,
    }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
