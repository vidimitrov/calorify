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
import ValidationLabel from '../../components/dashboard/ValidationLabel';
import CustomTypography from '../../components/dashboard/CustomTypography';
import CustomIconButton from '../../components/dashboard/CustomIconButton';
import CustomTextField from '../../components/dashboard/CustomTextField';
import logo from '../../assets/img/logo.png';
import {
  fetchMeals as fetchMealsActionCreator,
  updateMeal as updateMealActionCreator,
} from '../../actions/meals';
import { isNumber } from '../../lib/validations';

export class UpdateMeal extends React.Component {
  constructor(props) {
    super(props);

    const { meals, mealId } = props;
    const meal = meals.find(m => m.id === mealId);

    this.state = {
      name: meal ? meal.name : '',
      requiredName: false,
      calories: meal ? meal.calories : '',
      validCalories: true,
      requiredCalories: false,
      date: meal ? meal.date : '',
      time: meal ? meal.time : '',
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
    const { meals, getAllMeals, mealId } = this.props;

    if (meals.length === 0) {
      try {
        const fetchedMeals = await getAllMeals();
        const meal = fetchedMeals.find(m => m.id === mealId);

        this.setState({
          name: meal ? meal.name : '',
          calories: meal ? meal.calories : '',
          date: meal ? meal.date : '',
          time: meal ? meal.time : '',
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
    if (key === 'datetime') {
      this.setState({
        change: true,
        date: value.split('T')[0],
        time: value.split('T')[1],
      });
    } else {
      let {
        requiredName,
        requiredCalories,
        validCalories,
      } = this.state;

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

      if (key === 'name') {
        if (!value) {
          requiredName = true;
        } else {
          requiredName = false;
        }
      }

      this.setState({
        requiredName,
        requiredCalories,
        validCalories,
        change: true,
        [key]: value,
      });
    }
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
      mealId,
      updateMeal,
      userId,
    } = this.props;
    const {
      name,
      calories,
      date,
      time,
      change,
      validCalories,
      requiredCalories,
      requiredName,
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
              Update Meal
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
                onChange={e => this.onChangeHandler('name', e.target.value)}
              />
            </InputWrapper>
            <ValidationLabel
              invalid={requiredName}
            >
              Meal name is required
            </ValidationLabel>
            <InputWrapper invalid={requiredCalories || !validCalories}>
              <CustomTextField
                placeholder="Number of calories"
                value={calories}
                name="calories"
                onChange={e => this.onChangeHandler('calories', e.target.value)}
              />
            </InputWrapper>
            <ValidationLabel
              invalid={requiredCalories}
            >
              Number of calories is required
            </ValidationLabel>
            <ValidationLabel
              invalid={!validCalories}
            >
              Number of calories should contain only numbers
            </ValidationLabel>
            <InputWrapper>
              <CustomTextField
                placeholder="Date"
                value={`${date}T${time}`}
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={e => this.onChangeHandler('datetime', e.target.value)}
              />
            </InputWrapper>
          </FormControls>
          {/* TODO: It should be disabled if no changes are made */}
          <Button
            variant="contained"
            color="primary"
            disabled={!change}
            name="submit-update-meal"
            onClick={() => {
              updateMeal(mealId, {
                name,
                calories,
                date,
                time,
              })
                .then(() => {
                  this.setState({
                    positiveSnackbarOpen: true,
                    positiveMessage: 'Meal updated successfully',
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
                    negativeMessage: 'Couldn\'t update meal. Try again!',
                  });
                });
            }}
          >
            Update Meal
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

UpdateMeal.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dailyCaloriesLimit: PropTypes.number.isRequired,
  }),
  meals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
  })),
  updateMeal: PropTypes.func.isRequired,
  getAllMeals: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  mealId: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

UpdateMeal.defaultProps = {
  account: null,
  meals: null,
  userId: null,
};

const mapStateToProps = state => ({
  account: isEmpty(state.account.data) ? null : state.account.data,
  meals: state.meals.data,
});

const mapDispatchToProps = dispatch => ({
  getAllMeals: () => dispatch(fetchMealsActionCreator()),
  updateMeal: (mealId, updates) => dispatch(updateMealActionCreator(mealId, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMeal);
