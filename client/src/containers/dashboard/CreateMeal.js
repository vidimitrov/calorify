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
import { createMeal as createMealActionCreator } from '../../actions/meals';

export class CreateMeal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      calories: '',
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const {
      user,
      createMeal,
    } = this.props;
    const {
      name,
      calories,
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
              Create Meal
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
          </FormControls>
          {/* TODO: It should be disabled if no changes are made */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              createMeal(name, calories)
                .then(() => {
                  // TODO: Show positive snackbar
                  navigate('/');
                }).catch(() => {
                  // TODO: Show negative snackbar. Try again
                });
            }}
          >
            Create Meal
          </Button>
        </Form>
      </Wrapper>
    );
  }
}

CreateMeal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    daily_calories_limit: PropTypes.number.isRequired,
  }),
  createMeal: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

CreateMeal.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  user: state.user.data,
});

const mapDispatchToProps = dispatch => ({
  createMeal: (name, calories) => dispatch(createMealActionCreator({ name, calories })),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeal);
