import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import _ from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Fastfood from '@material-ui/icons/Fastfood';
import AddIcon from '@material-ui/icons/Add';
import CustomTypography from '../../../components/dashboard/CustomTypography';
import CustomIconButton from '../../../components/dashboard/CustomIconButton';
import Logo from '../../../components/dashboard/Logo';
import Wrapper from '../../../components/dashboard/Wrapper';
import CustomList from '../../../components/dashboard/CustomList';
import FabButton from '../../../components/dashboard/FabButton';
import CustomSnackbar from '../../../components/common/CustomSnackbar';
import ScrollContainer from '../../../components/dashboard/ScrollContainer';
import Card from '../../../components/dashboard/Card/Card';
import CardInfo from '../../../components/dashboard/Card/CardInfo';
import CardActions from '../../../components/dashboard/Card/CardActions';
import logo from '../../../assets/img/logo.png';
import {
  fetchUsers as fetchUsersActionCreator,
  removeUser as removeUserActionCreator,
} from '../../../actions/users';

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
    const { getAllUsers } = this.props;
    try {
      await getAllUsers();
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
      users,
      navigate,
      removeUser,
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
    } if (account.role !== 'manager' && account.role !== 'admin') {
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
        <CustomList top>
          <ScrollContainer>
            {users.map(user => (
              <Card key={user.id} user name="user-card">
                <CardInfo title={user.name} subtitle={user.email} />
                <CardActions
                  wide
                  customAction={account.role === 'admin' ? {
                    icon: (<Fastfood />),
                    handler: () => navigate(`/users/${user.id}/meals`),
                    name: 'user-meals',
                    title: 'User meals',
                  } : null}
                  onEditHandler={() => navigate(`/users/${user.id}`)}
                  onDeleteHandler={() => removeUser(user.id)
                    .then(() => {
                      this.setState({
                        positiveSnackbarOpen: true,
                        positiveMessage: 'User deleted successfully!',
                      });
                    })
                    .catch(() => this.setState({
                      negativeSnackbarOpen: true,
                      negativeMessage: 'Couldn\'t delete user. Try again!',
                    }))
                  }
                />
              </Card>
            ))}
            {users.length === 0
              && <div />
            }
          </ScrollContainer>
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
  account: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dailyCaloriesLimit: PropTypes.number.isRequired,
  }),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    dailyCaloriesLimit: PropTypes.number.isRequired,
  })),
  navigate: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

Users.defaultProps = {
  account: null,
  users: [],
};

const mapStateToProps = state => ({
  account: _.isEmpty(state.account.data) ? null : state.account.data,
  users: state.users.data,
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(fetchUsersActionCreator()),
  removeUser: userId => dispatch(removeUserActionCreator(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
