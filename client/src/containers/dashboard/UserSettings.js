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
import CustomSnackbar from '../../components/common/CustomSnackbar';
import Form from '../../components/dashboard/Form';
import FormControls from '../../components/dashboard/FormControls';
import InputWrapper from '../../components/dashboard/InputWrapper';
import Logo from '../../components/dashboard/Logo';
import Wrapper from '../../components/dashboard/Wrapper';
import CustomTypography from '../../components/dashboard/CustomTypography';
import CustomIconButton from '../../components/dashboard/CustomIconButton';
import CustomTextField from '../../components/dashboard/CustomTextField';
import logo from '../../assets/img/logo.png';
import { updateUser as updateUserActionCreator } from '../../actions/users';

export class UserSettings extends React.Component {
  constructor(props) {
    super(props);

    const { account } = props;
    const { name, dailyCaloriesLimit } = account || {};

    this.state = {
      name,
      dailyCalories: dailyCaloriesLimit,
      change: false,
      positiveSnackbarOpen: false,
      negativeSnackbarOpen: false,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handlePositiveSnackbarClose = this.handlePositiveSnackbarClose.bind(this);
    this.handleNegativeSnackbarClose = this.handleNegativeSnackbarClose.bind(this);
  }

  onChangeHandler(key, value) {
    this.setState({
      change: true,
      [key]: value,
    });
  }

  handlePositiveSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      positiveSnackbarOpen: false,
    });
  }

  handleNegativeSnackbarClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      negativeSnackbarOpen: false,
    });
  }

  render() {
    const {
      account,
      updateUser,
    } = this.props;
    const {
      name,
      dailyCalories,
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
      <Wrapper>
        <AppBar position="static">
          <Toolbar>
            <CustomIconButton color="secondary" aria-label="Menu">
              <ArrowBack onClick={() => navigate('/')} />
            </CustomIconButton>
            <Logo src={logo} alt="logo" />
            <CustomTypography variant="h6" color="secondary">
              User Settings
            </CustomTypography>
          </Toolbar>
        </AppBar>
        <Form>
          <FormControls>
            <InputWrapper>
              <CustomTextField
                label="Full name"
                value={name}
                id="name"
                name="name"
                onChange={e => this.onChangeHandler('name', e.target.value)}
              />
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
            name="submit-account-update"
            disabled={!change}
            onClick={() => {
              updateUser(account.id, {
                name,
                dailyCalories,
              }).then(() => {
                this.setState({
                  positiveSnackbarOpen: true,
                });
              }).catch(() => {
                this.setState({
                  negativeSnackbarOpen: true,
                });
              });
            }}
          >
            Save Changes
          </Button>
        </Form>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={positiveSnackbarOpen}
          autoHideDuration={3000}
          onClose={this.handlePositiveSnackbarClose}
        >
          <CustomSnackbar
            onClose={this.handlePositiveSnackbarClose}
            variant="success"
            message="Account is updated successfully!"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={negativeSnackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleNegativeSnackbarClose}
        >
          <CustomSnackbar
            onClose={this.handleNegativeSnackbarClose}
            variant="error"
            message="There was some problem. Please try again"
          />
        </Snackbar>
      </Wrapper>
    );
  }
}

UserSettings.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dailyCaloriesLimit: PropTypes.number.isRequired,
  }),
  updateUser: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

UserSettings.defaultProps = {
  account: null,
};

const mapStateToProps = state => ({
  account: isEmpty(state.account.data) ? null : state.account.data,
});

const mapDispatchToProps = dispatch => ({
  updateUser: (userId, updates) => dispatch(updateUserActionCreator(userId, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
