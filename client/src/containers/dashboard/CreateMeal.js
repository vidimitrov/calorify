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
import ValidationLabel from '../../components/dashboard/ValidationLabel';
import logo from '../../assets/img/logo.png';
import { createMeal as createMealActionCreator } from '../../actions/meals';
import { convertDateToUTC } from '../../lib/dates';
import { isNumber } from '../../lib/validations';

export class CreateMeal extends React.Component {
  constructor(props) {
    super(props);

    const now = props.initialDate || new Date();
    const dateWithTimeZone = convertDateToUTC(now);
    const splittedString = dateWithTimeZone.toISOString().split(':');
    const defaultDate = `${splittedString[0]}:${splittedString[1]}`;

    this.state = {
      name: '',
      calories: '',
      date: defaultDate,
      requiredName: false,
      requiredCalories: false,
      validCalories: true,
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
      requiredCalories,
      validCalories,
    } = this.state;

    if (key === 'name') {
      if (!value) {
        requiredName = true;
      } else {
        requiredName = false;
      }
    }

    if (key === 'calories') {
      if (value && !isNumber(value)) {
        requiredCalories = false;
        validCalories = false;
      } else if (value) {
        requiredCalories = false;
        validCalories = true;
      } else {
        requiredCalories = true;
        validCalories = true;
      }
    }

    this.setState({
      change: true,
      requiredName,
      requiredCalories,
      validCalories,
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
      createMeal,
      userId,
    } = this.props;
    const {
      name,
      calories,
      date,
      requiredName,
      requiredCalories,
      validCalories,
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
      <Wrapper data-testid="create-meal-page">
        <AppBar position="static">
          <Toolbar>
            <CustomIconButton color="secondary" aria-label="Menu">
              <ArrowBack onClick={() => {
                if (userId) {
                  navigate(`/users/${userId}/meals`);
                } else {
                  navigate('/');
                }
              }}
              />
            </CustomIconButton>
            <Logo src={logo} alt="logo" />
            <CustomTypography variant="h6" color="secondary">
              Create Meal
            </CustomTypography>
          </Toolbar>
        </AppBar>
        <Form>
          <FormControls>
            <InputWrapper invalid={requiredName}>
              <CustomTextField
                placeholder="Meal name"
                value={name}
                name="name"
                error={requiredName}
                onChange={e => this.onChangeHandler('name', e.target.value)}
              />
              <ValidationLabel
                name={requiredName ? 'required-name' : ''}
                invalid={requiredName}
              >
                Meal name is required
              </ValidationLabel>
            </InputWrapper>
            <InputWrapper invalid={requiredCalories || !validCalories}>
              <CustomTextField
                placeholder="Number of calories"
                value={calories}
                name="calories"
                error={requiredCalories}
                onChange={e => this.onChangeHandler('calories', e.target.value)}
              />
              <ValidationLabel
                name={requiredCalories ? 'required-calories' : ''}
                invalid={requiredCalories}
              >
                Meal calories are required
              </ValidationLabel>
              <ValidationLabel
                invalid={!validCalories}
              >
                Number of calories should contain only numbers
              </ValidationLabel>
            </InputWrapper>
            <InputWrapper>
              <CustomTextField
                placeholder="Date (optional)"
                value={date}
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => this.onChangeHandler('date', e.target.value)}
              />
            </InputWrapper>
          </FormControls>
          <Button
            variant="contained"
            color="primary"
            name="submit-create-meal"
            disabled={!change}
            onClick={() => {
              if (!name || !calories) {
                this.setState({
                  requiredName: !name,
                  requiredCalories: !calories,
                });
              } else {
                const isoDate = convertDateToUTC(new Date(date)).toISOString();
                const formattedDate = isoDate.split('T')[0];
                const formattedTime = isoDate.split('T')[1].split('Z')[0];

                createMeal(name, calories, formattedDate, formattedTime)
                  .then(() => {
                    this.setState({
                      positiveSnackbarOpen: true,
                    });
                    setTimeout(() => {
                      if (userId) {
                        navigate(`/users/${userId}/meals`);
                      } else {
                        navigate('/');
                      }
                    }, 1000);
                  }).catch(() => {
                    this.setState({
                      negativeSnackbarOpen: true,
                    });
                  });
              }
            }}
          >
            Create Meal
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
            message="Meal created successfully"
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
            message="Couldn\'t create meal. Please try again"
          />
        </Snackbar>
      </Wrapper>
    );
  }
}

CreateMeal.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dailyCaloriesLimit: PropTypes.number.isRequired,
  }),
  createMeal: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  initialDate: PropTypes.instanceOf(Date),
  userId: PropTypes.string,
};

CreateMeal.defaultProps = {
  account: null,
  initialDate: null,
  userId: null,
};

const mapStateToProps = state => ({
  account: isEmpty(state.account.data) ? null : state.account.data,
});

const mapDispatchToProps = dispatch => ({
  createMeal: (name, calories, date, time) => dispatch(
    createMealActionCreator({
      name,
      calories,
      date,
      time,
    }),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeal);
