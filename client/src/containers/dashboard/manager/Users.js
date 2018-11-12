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

export class Users extends React.Component {
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
    // try {
    // } catch (error) {
    //   this.setState({
    //     negativeSnackbarOpen: true,
    //     negativeMessage: 'Something went wrong!',
    //   });
    // }
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
      navigate,
    } = this.props;
    const {
      positiveSnackbarOpen,
      negativeSnackbarOpen,
      positiveMessage,
      negativeMessage,
    } = this.state;

    if (!user) {
      return (
        <Redirect to="/auth/login" />
      );
    } if (user.role !== 'manager' && user.role !== 'admin') {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <Wrapper data-testid="users">
        <AppBar position="static">
          <Toolbar>
            <CustomIconButton color="secondary" aria-label="Menu">
              <ArrowBack onClick={() => navigate('/')} />
            </CustomIconButton>
            <Logo src={logo} alt="logo" />
            <CustomTypography variant="h6" color="secondary">
              All Users
            </CustomTypography>
          </Toolbar>
        </AppBar>
        <CustomList>
          <ScrollContainer />
        </CustomList>
        <FabButton
          variant="fab"
          color="primary"
          name="add-user-fab"
          aria-label="Add"
          onClick={() => {
            navigate('/create-user');
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

Users.propTypes = {
  user: PropTypes.shape({
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
};

Users.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  user: _.isEmpty(state.user.data) ? null : state.user.data,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);