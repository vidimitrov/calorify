/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import moment from 'moment';
import _ from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FilterList from '@material-ui/icons/FilterList';
import Close from '@material-ui/icons/Close';
import ExitToApp from '@material-ui/icons/ExitToApp';
import People from '@material-ui/icons/People';
import Fastfood from '@material-ui/icons/Fastfood';
import AddIcon from '@material-ui/icons/Add';
import CustomSnackbar from '../../components/common/CustomSnackbar';
import Logo from '../../components/dashboard/Logo';
import Wrapper from '../../components/dashboard/Wrapper';
import CustomTypography from '../../components/dashboard/CustomTypography';
import FabButton from '../../components/dashboard/FabButton';
import CustomList from '../../components/dashboard/CustomList';
import ScrollContainer from '../../components/dashboard/ScrollContainer';
import GroupHeading from '../../components/dashboard/GroupHeading';
import Filters from '../../components/dashboard/Filters';
import FiltersControls from '../../components/dashboard/FiltersControls';
import Card from '../../components/dashboard/Card/Card';
import CardInfo from '../../components/dashboard/Card/CardInfo';
import CardDate from '../../components/dashboard/Card/CardDate';
import CardActions from '../../components/dashboard/Card/CardActions';
import CardStatus from '../../components/dashboard/Card/CardStatus';
import EmptyMealsList from '../../components/dashboard/EmptyMealsList';
import logo from '../../assets/img/logo.png';
import { logout as logoutActionCreator } from '../../actions/authentication';
import {
  fetchMeals as fetchMealsActionCreator,
  removeMeal as removeMealActionCreator,
  filterMeals as filterMealsAction,
  resetMealsFilters as resetMealsFiltersAction,
} from '../../actions/meals';

export class Main extends React.Component {
  constructor(props) {
    super(props);

    const { account, initialDate } = props;
    const { createdAt } = account || {};

    this.state = {
      anchorEl: null,
      showFilters: false,
      dateFrom: moment(createdAt).toISOString().split('T')[0],
      dateTo: initialDate || moment().toISOString().split('T')[0],
      timeFrom: '00:00',
      timeTo: '23:59',
      positiveSnackbarOpen: false,
      negativeSnackbarOpen: false,
      positiveMessage: null,
      negativeMessage: null,
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.toggleFiltersVisibility = this.toggleFiltersVisibility.bind(this);
    this.isInRange = this.isInRange.bind(this);
    this.getTotalCaloriesForDate = this.getTotalCaloriesForDate.bind(this);
    this.handlePositiveSnackbarClose = this.handlePositiveSnackbarClose.bind(this);
    this.handleNegativeSnackbarClose = this.handleNegativeSnackbarClose.bind(this);
  }

  async componentDidMount() {
    const { getAllMeals } = this.props;
    try {
      await getAllMeals();
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

  handleMenu(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
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

  toggleFiltersVisibility() {
    const { account, resetMealsFilters, initialDate } = this.props;
    const { showFilters } = this.state;
    let updates = {};

    if (showFilters) {
      resetMealsFilters();
      updates = {
        dateFrom: moment(account.createdAt).toISOString().split('T')[0],
        dateTo: initialDate || moment().toISOString().split('T')[0],
        timeFrom: '00:00',
        timeTo: '23:59',
      };
    }

    this.setState({
      ...updates,
      showFilters: !showFilters,
    });
  }

  handleFilterChange(key, value) {
    const {
      filterMeals,
    } = this.props;

    this.setState({
      [key]: value,
    }, () => {
      const {
        dateFrom,
        dateTo,
        timeFrom,
        timeTo,
      } = this.state;

      filterMeals({
        dateFrom,
        dateTo,
        timeFrom,
        timeTo,
      });
    });
  }

  render() {
    const {
      navigate,
      account,
      filteredMeals,
      logout,
      removeMeal,
    } = this.props;
    const {
      anchorEl,
      showFilters,
      dateFrom,
      dateTo,
      timeFrom,
      timeTo,
      positiveSnackbarOpen,
      negativeSnackbarOpen,
      positiveMessage,
      negativeMessage,
    } = this.state;
    let { meals } = this.props;

    if (showFilters) {
      meals = filteredMeals;
    }

    const open = Boolean(anchorEl);
    const mealsGroupedByDate = _.groupBy(meals, 'date');
    const groupDates = Object.keys(mealsGroupedByDate).sort((a, b) => moment(b).diff(moment(a)));

    if (!account) {
      return (
        <Redirect to="/auth/login" />
      );
    }

    return (
      <Wrapper data-testid="dashboard">
        <AppBar position="static">
          <Toolbar>
            <Logo src={logo} alt="logo" />
            <CustomTypography variant="h6" color="secondary">
              Calorify
            </CustomTypography>
            <div>
              {account.role === 'admin' && (
                <IconButton
                  name="meals"
                  title="All meals"
                  onClick={() => navigate('/meals')}
                  color="secondary"
                >
                  <Fastfood />
                </IconButton>
              )}
              {(account.role === 'manager' || account.role === 'admin') && (
                <IconButton
                  name="users"
                  title="All users"
                  onClick={() => navigate('/users')}
                  color="secondary"
                >
                  <People />
                </IconButton>
              )}
              <IconButton
                name="account-settings"
                title="Account settings"
                onClick={() => navigate('/settings')}
                color="secondary"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                name="logout-button"
                title="Log out"
                onClick={() => logout().then(() => navigate('/auth/login'))}
                color="secondary"
              >
                <ExitToApp />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Filters visible={showFilters}>
          <FiltersControls visible={showFilters}>
            <TextField
              label="From"
              type="date"
              value={dateFrom}
              onChange={e => this.handleFilterChange('dateFrom', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="To"
              type="date"
              value={dateTo}
              onChange={e => this.handleFilterChange('dateTo', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="From"
              type="time"
              value={timeFrom}
              onChange={e => this.handleFilterChange('timeFrom', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="To"
              type="time"
              value={timeTo}
              onChange={e => this.handleFilterChange('timeTo', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FiltersControls>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={() => {
                this.toggleFiltersVisibility();
              }}
              color="default"
            >
              {!showFilters ? <FilterList /> : <Close />}
            </IconButton>
          </div>
        </Filters>
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
                      <CardInfo name={meal.name} calories={meal.calories} />
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
            {groupDates.length === 0 && !showFilters
              && <EmptyMealsList />
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

Main.propTypes = {
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
  filteredMeals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
  })),
  navigate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getAllMeals: PropTypes.func.isRequired,
  removeMeal: PropTypes.func.isRequired,
  filterMeals: PropTypes.func.isRequired,
  resetMealsFilters: PropTypes.func.isRequired,
  initialDate: PropTypes.string,
};

Main.defaultProps = {
  account: null,
  meals: [],
  filteredMeals: [],
  initialDate: null,
};

const mapStateToProps = state => ({
  account: _.isEmpty(state.account.data) ? null : state.account.data,
  meals: state.meals.data,
  filteredMeals: state.meals.filteredData,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutActionCreator()),
  getAllMeals: () => dispatch(fetchMealsActionCreator()),
  removeMeal: mealId => dispatch(removeMealActionCreator(mealId)),
  filterMeals: filters => dispatch(filterMealsAction(filters)),
  resetMealsFilters: () => dispatch(resetMealsFiltersAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
