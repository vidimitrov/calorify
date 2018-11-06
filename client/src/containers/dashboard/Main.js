import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreVert from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Logo from '../../components/dashboard/Logo';
import Wrapper from '../../components/dashboard/Wrapper';
import CustomTypography from '../../components/dashboard/CustomTypography';
import { logout as logoutActionCreator } from '../../actions/authentication';
import logo from '../../assets/img/logo.png';

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  render() {
    const {
      user,
      logout,
    } = this.props;
    const { navigate } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

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
    provider: PropTypes.string.isRequired,
    daily_calories_limit: PropTypes.number.isRequired,
  }),
  navigate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

Main.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutActionCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
