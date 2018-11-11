import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import { isEmpty } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
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

    const { user } = props;
    const { name, dailyCaloriesLimit } = user || {};

    this.state = {
      name,
      dailyCalories: dailyCaloriesLimit,
      change: false,
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(key, value) {
    this.setState({
      change: true,
      [key]: value,
    });
  }

  render() {
    const {
      user,
      updateUser,
    } = this.props;
    const {
      name,
      dailyCalories,
      change,
    } = this.state;
    const { navigate } = this.props;

    if (!user) {
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
          {/* TODO: It should be disabled if no changes are made */}
          <Button
            variant="contained"
            color="primary"
            name="submit-account-update"
            disabled={!change}
            onClick={() => {
              updateUser(user.id, {
                name,
                dailyCalories,
              }).then(() => {
                // TODO: Show positive snackbar
              }).catch(() => {
                // TODO: Show negative snackbar. Try again
              });
            }}
          >
            Save Changes
          </Button>
        </Form>
      </Wrapper>
    );
  }
}

UserSettings.propTypes = {
  user: PropTypes.shape({
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
  user: null,
};

const mapStateToProps = state => ({
  user: isEmpty(state.user.data) ? null : state.user.data,
});

const mapDispatchToProps = dispatch => ({
  updateUser: (userId, updates) => dispatch(updateUserActionCreator(userId, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
