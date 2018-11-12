import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import moment from 'moment';
import _ from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import CustomTypography from '../../../components/dashboard/CustomTypography';
import CustomIconButton from '../../../components/dashboard/CustomIconButton';
import Logo from '../../../components/dashboard/Logo';
import Wrapper from '../../../components/dashboard/Wrapper';
import CustomList from '../../../components/dashboard/CustomList';
import FabButton from '../../../components/dashboard/FabButton';
import CustomSnackbar from '../../../components/common/CustomSnackbar';
import ScrollContainer from '../../../components/dashboard/ScrollContainer';
import GroupHeading from '../../../components/dashboard/GroupHeading';
import Card from '../../../components/dashboard/Card/Card';
import CardInfo from '../../../components/dashboard/Card/CardInfo';
import CardDate from '../../../components/dashboard/Card/CardDate';
import CardActions from '../../../components/dashboard/Card/CardActions';
import CardStatus from '../../../components/dashboard/Card/CardStatus';
import logo from '../../../assets/img/logo.png';
import {
  fetchMeals as fetchMealsActionCreator,
} from '../../../actions/meals';

export class Meals extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positiveSnackbarOpen: false,
      negativeSnackbarOpen: false,
      positiveMessage: null,
      negativeMessage: null,
    };

    this.handlePositiveSnackbarClose = this.handlePositiveSnackbarClose.bind(this);
    this.handleNegativeSnackbarClose = this.handleNegativeSnackbarClose.bind(this);
  }

  async componentDidMount() {
    const { getAllMealsForUser, userId } = this.props;
    try {
      await getAllMealsForUser(userId);
    } catch (error) {
      this.setState({
        negativeSnackbarOpen: true,
        negativeMessage: 'Something went wrong!',
      });
    }
  }

  getTotalCaloriesForDate(date) {
    const { meals } = this.props;
    const filteredMeals = meals.filter(m => m.date === date);
    const totalCalories = filteredMeals
      .reduce((accumulator, currentValue) => accumulator + currentValue.calories, 0);

    return totalCalories;
  }

  isInRange(date) {
    const { account } = this.props;
    const totalCalories = this.getTotalCaloriesForDate(date);

    return totalCalories < account.dailyCaloriesLimit;
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
      navigate,
      meals,
      removeMeal,
    } = this.props;
    const {
      positiveSnackbarOpen,
      negativeSnackbarOpen,
      positiveMessage,
      negativeMessage,
    } = this.state;


    if (!account) {
      return (
        <Redirect to="/auth/login" />
      );
    } if (account.role !== 'admin') {
      return (
        <Redirect to="/" />
      );
    }


    const mealsGroupedByDate = _.groupBy(meals, 'date');
    const groupDates = Object.keys(mealsGroupedByDate).sort((a, b) => moment(b).diff(moment(a)));
    /* eslint react/no-array-index-key: 0 */

    return (
      <Wrapper data-testid="meals">
        <AppBar position="static">
          <Toolbar>
            <CustomIconButton color="secondary" aria-label="Menu">
              <ArrowBack onClick={() => navigate('/users')} />
            </CustomIconButton>
            <Logo src={logo} alt="logo" />
            <CustomTypography variant="h6" color="secondary">
              All User Meals
            </CustomTypography>
          </Toolbar>
        </AppBar>
        <CustomList>
          <ScrollContainer>
            {groupDates.length > 0 && groupDates.map((gDate, index) => (
              <div key={index}>
                <GroupHeading>
                  {(moment(gDate).calendar().split(' at'))[0]}
                  {' '}
                  (
                  {this.getTotalCaloriesForDate(gDate)}
                  {' '}
                  /
                  {' '}
                  {account.dailyCaloriesLimit}
                  {' kCal'}
                  )
                </GroupHeading>
                {mealsGroupedByDate[gDate]
                  .sort((a, b) => {
                    const from = `${a.date}T${a.time}`;
                    const to = `${b.date}T${b.time}`;
                    return moment(to).diff(moment(from));
                  })
                  .map(meal => (
                    <Card key={meal.id} name="meal-card">
                      <CardStatus inRange={this.isInRange(meal.date)} />
                      <CardInfo title={`${meal.calories} kCal`} subtitle={meal.name} />
                      <CardDate date={`${meal.date}T${meal.time}`} />
                      <CardActions
                        onEditHandler={() => navigate(`/meals/${meal.id}`)}
                        onDeleteHandler={() => removeMeal(meal.id)
                          .then(() => {
                            this.setState({
                              positiveSnackbarOpen: true,
                              positiveMessage: 'Meal deleted successfully!',
                            });
                          })
                          .catch(() => this.setState({
                            negativeSnackbarOpen: true,
                            negativeMessage: 'Couldn\'t delete meal. Try again!',
                          }))
                        }
                      />
                    </Card>
                  ))}
              </div>
            ))}
            {groupDates.length === 0
              && <h3>User has no meals</h3>
            }
          </ScrollContainer>
        </CustomList>
        <FabButton
          variant="fab"
          color="primary"
          name="add-meal-fab"
          aria-label="Add"
          onClick={() => {
            navigate('/create-meal');
          }}
        >
          <AddIcon />
        </FabButton>
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
            message={positiveMessage}
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
            message={negativeMessage}
          />
        </Snackbar>
      </Wrapper>
    );
  }
}

Meals.propTypes = {
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
  navigate: PropTypes.func.isRequired,
  removeMeal: PropTypes.func.isRequired,
  getAllMealsForUser: PropTypes.func.isRequired,
};

Meals.defaultProps = {
  account: null,
  meals: [],
};

const mapStateToProps = state => ({
  account: _.isEmpty(state.account.data) ? null : state.account.data,
  meals: state.meals.data,
});

const mapDispatchToProps = dispatch => ({
  getAllMealsForUser: userId => dispatch(fetchMealsActionCreator(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
