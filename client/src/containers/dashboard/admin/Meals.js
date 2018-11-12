import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
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

    return (
      <Wrapper data-testid="meals">
        <AppBar position="static">
          <Toolbar>
            <CustomIconButton color="secondary" aria-label="Menu">
              <ArrowBack onClick={() => navigate('/users')} />
            </CustomIconButton>
            <Logo src={logo} alt="logo" />
            <CustomTypography variant="h6" color="secondary">
              All (User) Meals
            </CustomTypography>
          </Toolbar>
        </AppBar>
        <CustomList>
          <ScrollContainer />
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
  // meals: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   date: PropTypes.string.isRequired,
  //   time: PropTypes.string.isRequired,
  //   calories: PropTypes.number.isRequired,
  // })),
  navigate: PropTypes.func.isRequired,
  // removeMeal: PropTypes.func.isRequired,
  getAllMeals: PropTypes.func.isRequired,
};

Meals.defaultProps = {
  account: null,
  // meals: [],
};

const mapStateToProps = state => ({
  account: _.isEmpty(state.account.data) ? null : state.account.data,
  meals: state.meals.data,
});

const mapDispatchToProps = dispatch => ({
  getAllMeals: () => dispatch(fetchMealsActionCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meals);
