import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
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
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
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
        // TODO: Show error snackbar
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
        [key]: value,
      });
    }
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
                onChange={e => this.onChangeHandler('name', e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <CustomTextField
                placeholder="Number of calories"
                value={calories}
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
            onClick={() => {
              updateMeal(mealId, {
                name,
                calories,
                date,
                time,
              })
                .then(() => {
                  // TODO: Show positive snackbar
                  navigate('/');
                }).catch(() => {
                  // TODO: Show negative snackbar. Try again
                });
            }}
          >
            Update Meal
          </Button>
        </Form>
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
  user: state.user.data,
  meals: state.meals.data,
});

const mapDispatchToProps = dispatch => ({
  getAllMeals: () => dispatch(fetchMealsActionCreator()),
  updateMeal: (mealId, updates) => dispatch(updateMealActionCreator(mealId, updates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateMeal);
