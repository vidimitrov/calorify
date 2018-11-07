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
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreVert from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import Logo from '../../components/dashboard/Logo';
import Wrapper from '../../components/dashboard/Wrapper';
import CustomTypography from '../../components/dashboard/CustomTypography';
import FabButton from '../../components/dashboard/FabButton';
import MealsList from '../../components/dashboard/MealsList';
import ScrollContainer from '../../components/dashboard/ScrollContainer';
import GroupHeading from '../../components/dashboard/GroupHeading';
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
} from '../../actions/meals';

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  isInRange(date) {
    const { meals, user } = this.props;
    const filteredMeals = meals.filter(m => m.date === date);
    const totalCalories = filteredMeals
      .reduce((accumulator, currentValue) => accumulator + currentValue.number_of_calories, 0);

    return totalCalories < user.daily_calories_limit;
  }

  render() {
    const {
      navigate,
      user,
      meals,
      logout,
      removeMeal,
    } = this.props;
    const { anchorEl } = this.state;
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
        <MealsList>
          <ScrollContainer>
            {groupDates.map((gDate, index) => (
              <div key={index}>
                <GroupHeading>{(moment(gDate).calendar().split(' at'))[0]}</GroupHeading>
                {mealsGroupedByDate[gDate].map(meal => (
                  <Card key={meal.id}>
                    <CardStatus inRange={this.isInRange(meal.date)} />
                    <CardInfo text={meal.text} calories={meal.number_of_calories} />
                    <CardDate date={meal.updated_at} />
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
    daily_calories_limit: PropTypes.number.isRequired,
  }),
  meals: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    number_of_calories: PropTypes.number.isRequired,
  })),
  navigate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getAllMeals: PropTypes.func.isRequired,
  removeMeal: PropTypes.func.isRequired,
};

Main.defaultProps = {
  user: null,
  meals: [],
};

const mapStateToProps = state => ({
  user: state.user.data,
  meals: state.meals.data,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutActionCreator()),
  getAllMeals: () => dispatch(fetchMealsActionCreator()),
  removeMeal: mealId => dispatch(removeMealActionCreator(mealId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
