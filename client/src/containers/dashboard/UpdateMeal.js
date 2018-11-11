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
import {
  fetchMeals as fetchMealsActionCreator,
  updateMeal as updateMealActionCreator,
} from '../../actions/meals';

export class UpdateMeal extends React.Component {
  constructor(props) {
    super(props);

    const { meals, mealId } = props;
    const meal = meals.find(m => m.id === mealId);

    this.state = {
      name: meal ? meal.name : '',
      calories: meal ? meal.calories : '',
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
        date: value.split('T')[0],
        time: value.split('T')[1],
      });
    } else {
      this.setState({
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
      user,
      mealId,
      updateMeal,
    } = this.props;
    const {
      name,
      calories,
      date,
      time,
      change,
      positiveSnackbarOpen,
      negativeSnackbarOpen,
      positiveMessage,
      negativeMessage,
    } = this.state;
    const { navigate } = this.props;

    if (!user) {
      return (
        <Redirect to="/auth/login" />
      );
    }

    return (
      <Wrapper data-testid="update-meal">
        <AppBar position="static">
          <Toolbar>
            <CustomIconButton color="secondary" aria-label="Menu">
              <ArrowBack onClick={() => navigate('/')} />
            </CustomIconButton>
            <Logo src={logo} alt="logo" />
            <CustomTypography variant="h6" color="secondary">
              Update Meal
            </CustomTypography>
          </Toolbar>
        </AppBar>
        <Form>
          <FormControls>
            <InputWrapper>
              <CustomTextField
                placeholder="Meal name"
                value={name}
                name="name"
                onChange={e => this.onChangeHandler('name', e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <CustomTextField
                placeholder="Number of calories"
                value={calories}
                name="calories"
                onChange={e => this.onChangeHandler('calories', e.target.value)}
              />
            </InputWrapper>
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
                    navigate('/');
                  }, 1000);
                }).catch(() => {
                  this.setState({
                    negativeSnackbarOpen: true,
                    negativeMessage: 'Couldn\'t update meals. Try again!',
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
  user: PropTypes.shape({
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
};

UpdateMeal.defaultProps = {
  user: null,
  meals: null,
};

const mapStateToProps = state => ({
  user: isEmpty(state.user.data) ? null : state.user.data,
  meals: state.meals.data,
});

const mapDispatchToProps = dispatch => ({
  getAllMeals: () => dispatch(fetchMealsActionCreator()),
  updateMeal: (mealId, updates) => dispatch(updateMealActionCreator(mealId, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMeal);
