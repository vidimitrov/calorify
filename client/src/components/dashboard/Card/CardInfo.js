import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #f0cd61;
  margin: 0px 20px;
  flex-grow:1;

  @media (max-width: 420px) {
    min-width: 105px;
  }
`;

const Text = styled.h3`
  margin: 0;
  color: #c7b26e;

  @media (max-width: 420px) {
    font-size: 16px;
  }
`;

const Calories = styled.h1`
  margin: 0;

  @media (max-width: 420px) {
    font-size: 18px;
  }
`;

const CardInfo = ({ text, calories }) => (
  <Wrapper>
    <Calories>
      {calories}
      {' '}
      kCal
    </Calories>
    <Text>{text}</Text>
  </Wrapper>
);

CardInfo.propTypes = {
  text: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
};

export default CardInfo;
