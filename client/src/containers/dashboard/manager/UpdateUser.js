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
import ValidationLabel from '../../../components/dashboard/ValidationLabel';
import CustomTypography from '../../../components/dashboard/CustomTypography';
import CustomIconButton from '../../../components/dashboard/CustomIconButton';
import CustomTextField from '../../../components/dashboard/CustomTextField';
import logo from '../../../assets/img/logo.png';
import {
  fetchUsers as fetchUsersActionCreator,
  updateUser as updateUserActionCreator,
} from '../../../actions/users';
import { isValidEmail } from '../../../lib/validations';

export class UpdateUser extends React.Component {
  constructor(props) {
    super(props);

    const { users, userId } = props;
    const user = users.find(u => u.id === userId);

    this.state = {
      name: user ? user.name : '',
      requiredName: false,
      email: user ? user.email : '',
      validEmail: true,
      requiredEmail: false,
      dailyCalories: user ? user.dailyCaloriesLimit : '',
      change: false,
      positiveSnackbarOpen: false,
      negativeSnackbarOpen: false,
      positiveMessage: null,
      negativeMessage: null,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handlePositiveSnackbarClose = this.handlePositiveSnackbarClose.bind(this);
    this.handleNegativeSnackbarClose = this.handleNegativeSnackbarClose.bind(this);
  }

  async componentDidMount() {
    const { users, getAllUsers, userId } = this.props;

    if (users.length === 0) {
      try {
        const fetchedUsers = await getAllUsers();
        const user = fetchedUsers.find(u => u.id === userId);

        this.setState({
          name: user ? user.name : '',
          email: user ? user.email : '',
          dailyCalories: user ? user.dailyCaloriesLimit : '',
        });
      } catch (error) {
        this.setState({
          negativeSnackbarOpen: true,
          negativeMessage: 'Something went wrong!',
        });
      }
    }
  }

  onChangeHandler(key, value) {
    let {
      requiredName,
      requiredEmail,
      validEmail,
    } = this.state;
    let newValue;

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

    if (key === 'dailyCalories') {
      if (!value) {
        newValue = 0;
      }
    }

    this.setState({
      requiredName,
      requiredEmail,
      validEmail,
      change: true,
      [key]: newValue || value,
    });
  }

  handlePositiveSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      positiveSnackbarOpen: false,
      positiveMessage: null,
    });
  }

  handleNegativeSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      negativeSnackbarOpen: false,
      negativeMessage: null,
    });
  }

  render() {
    const {
      account,
      userId,
      updateUser,
    } = this.props;
    const {
      name,
      email,
      dailyCalories,
      change,
      validEmail,
      requiredName,
      requiredEmail,
      positiveSnackbarOpen,
      negativeSnackbarOpen,
      positiveMessage,
      negativeMessage,
    } = this.state;
    const { navigate } = this.props;

    if (!account) {
      return (
        <Redirect to="/auth/login" />
      );
    }

    return (
      <Wrapper data-testid="update-meal">
        <AppBar position="static">
          <Toolbar>
            <CustomIconButton color="secondary" aria-label="Menu">
              <ArrowBack onClick={() => navigate('/users')} />
            </CustomIconButton>
            <Logo src={logo} alt="logo" />
            <CustomTypography variant="h6" color="secondary">
              Update User
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
                onChange={e => this.onChangeHandler('name', e.target.value)}
              />
              <ValidationLabel
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
                label="Daily calories"
                helperText="It's your expected calorie intake per day"
                value={dailyCalories}
                id="calories"
                name="calories"
                onChange={e => this.onChangeHandler('dailyCalories', e.target.value)}
              />
            </InputWrapper>
          </FormControls>
          <Button
            variant="contained"
            color="primary"
            disabled={!change}
            name="submit-update-user"
            onClick={() => {
              updateUser(userId, {
                name,
                email,
                dailyCalories,
              })
                .then(() => {
                  this.setState({
                    positiveSnackbarOpen: true,
                    positiveMessage: 'User updated successfully',
                  });
                  setTimeout(() => {
                    navigate('/users');
                  }, 1000);
                }).catch(() => {
                  this.setState({
                    negativeSnackbarOpen: true,
                    negativeMessage: 'Couldn\'t update user. Try again!',
                  });
                });
            }}
          >
            Update User
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
            message={positiveMessage}
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
            message={negativeMessage}
          />
        </Snackbar>
      </Wrapper>
    );
  }
}

UpdateUser.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dailyCaloriesLimit: PropTypes.number.isRequired,
  }),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dailyCaloriesLimit: PropTypes.number.isRequired,
  })),
  updateUser: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

UpdateUser.defaultProps = {
  account: null,
  users: [],
};

const mapStateToProps = state => ({
  account: isEmpty(state.account.data) ? null : state.account.data,
  users: state.users.data,
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(fetchUsersActionCreator()),
  updateUser: (userId, updates) => dispatch(updateUserActionCreator(userId, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
