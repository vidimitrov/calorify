import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import Wrapper from '../../components/dashboard/Wrapper';
import Header from '../../components/dashboard/Header';
import Logo from '../../components/dashboard/Logo';
import Headline from '../../components/dashboard/Headline';
import logo from '../../assets/img/logo.png';
import { logout as logoutActionCreator } from '../../actions/authentication';

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { user, logout } = this.props;

    if (!user) {
      return (
        <Redirect to="/auth/login" />
      );
    }

    return (
      <Wrapper>
        <Header>
          <Logo src={logo} />
          <Headline>
            Calorify - track your daily calories
          </Headline>
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              logout()
                .then(() => navigate('/auth/login'));
            }}
          >
            Logout
          </Button>
        </Header>
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
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutActionCreator()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
