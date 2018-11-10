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
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FilterList from '@material-ui/icons/FilterList';
import MoreVert from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import Logo from '../../components/dashboard/Logo';
import Wrapper from '../../components/dashboard/Wrapper';
import CustomTypography from '../../components/dashboard/CustomTypography';
import FabButton from '../../components/dashboard/FabButton';
import MealsList from '../../components/dashboard/MealsList';
import ScrollContainer from '../../components/dashboard/ScrollContainer';
import GroupHeading from '../../components/dashboard/GroupHeading';
import Filters from '../../components/dashboard/Filters';
import FiltersControls from '../../components/dashboard/FiltersControls';
import Card from '../../components/dashboard/Card/Card';
import CardInfo from '../../components/dashboard/Card/CardInfo';
import CardDate from '../../components/dashboard/Card/CardDate';
import CardActions from '../../components/dashboard/Card/CardActions';
import CardStatus from '../../components/dashboard/Card/CardStatus';
import logo from '../../assets/img/logo.png';
import { logout as logoutActionCreator } from '../../actions/authentication';
import {
  fetchMeals as fetchMealsActionCreator,
  removeMeal as removeMealActionCreator,
  filterMeals as filterMealsAction,
} from '../../actions/meals';

export class Main extends React.Component {
  constructor(props) {
    super(props);

    const { user } = props;
    const { createdAt } = user || {};

    this.state = {
      anchorEl: null,
      showFilters: false,
      dateFrom: moment(createdAt).toISOString().split('T')[0],
      dateTo: moment().toISOString().split('T')[0],
      timeFrom: '00:00',
      timeTo: '23:59',
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.toggleFiltersVisibility = this.toggleFiltersVisibility.bind(this);
    this.isInRange = this.isInRange.bind(this);
  }

  async componentDidMount() {
    const { getAllMeals } = this.props;
    try {
      await getAllMeals();
    } catch (error) {
      // TODO: Show error snackbar here
      throw error;
    }
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

  toggleFiltersVisibility() {
    const { showFilters } = this.state;
    this.setState({
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

  isInRange(date) {
    const { meals, user } = this.props;
    const filteredMeals = meals.filter(m => m.date === date);
    const totalCalories = filteredMeals
      .reduce((accumulator, currentValue) => accumulator + currentValue.calories, 0);

    return totalCalories < user.dailyCaloriesLimit;
  }

  render() {
    const {
      navigate,
      user,
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
    } = this.state;
    let { meals } = this.props;

    if (showFilters) {
      meals = filteredMeals;
    }

    const open = Boolean(anchorEl);
    const mealsGroupedByDate = _.groupBy(meals, 'date');
    const groupDates = Object.keys(mealsGroupedByDate).sort((a, b) => moment(b).diff(moment(a)));

    if (!user) {
      return (
        <Redirect to="/auth/login" />
      );
    }

    return (
      <Wrapper>
        <AppBar position="static">
          <Toolbar>
            <Logo src={logo} alt="logo" />
            <CustomTypography variant="h6" color="secondary">
              Calorify
            </CustomTypography>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={() => navigate('/settings')}
                color="secondary"
              >
                <AccountCircle />
              </IconButton>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="secondary"
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={() => logout().then(() => navigate('/auth/login'))}>Logout</MenuItem>
              </Menu>
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
              <FilterList />
            </IconButton>
          </div>
        </Filters>
        <MealsList>
          <ScrollContainer>
            {groupDates.map((gDate, index) => (
              <div key={index}>
                <GroupHeading>{(moment(gDate).calendar().split(' at'))[0]}</GroupHeading>
                {mealsGroupedByDate[gDate]
                  .sort((a, b) => {
                    const from = `${a.date}T${a.time}`;
                    const to = `${b.date}T${b.time}`;
                    return moment(to).diff(moment(from));
                  })
                  .map(meal => (
                    <Card key={meal.id}>
                      <CardStatus inRange={this.isInRange(meal.date)} />
                      <CardInfo name={meal.name} calories={meal.calories} />
                      <CardDate date={`${meal.date}T${meal.time}`} />
                      <CardActions
                        onEditHandler={() => navigate(`/meals/${meal.id}`)}
                        onDeleteHandler={() => removeMeal(meal.id).then(() => this.forceUpdate())}
                      />
                    </Card>
                  ))}
              </div>
            ))}
          </ScrollContainer>
        </MealsList>
        <FabButton
          variant="fab"
          color="primary"
          aria-label="Add"
          onClick={() => {
            navigate('/create-meal');
          }}
        >
          <AddIcon />
        </FabButton>
      </Wrapper>
    );
  }
}

Main.propTypes = {
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
};

Main.defaultProps = {
  user: null,
  meals: [],
  filteredMeals: [],
};

const mapStateToProps = state => ({
  user: _.isEmpty(state.user.data) ? null : state.user.data,
  meals: state.meals.data,
  filteredMeals: state.meals.filteredData,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutActionCreator()),
  getAllMeals: () => dispatch(fetchMealsActionCreator()),
  removeMeal: mealId => dispatch(removeMealActionCreator(mealId)),
  filterMeals: filters => dispatch(filterMealsAction(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
