import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #f0cd61;
  margin: 0px 20px;
  max-width: 200px;
`;

const FormattedTime = styled.h3`
  margin: 0;
  color: #c7b26e;

  @media (max-width: 420px) {
    font-size: 16px;
  }
`;

const FormattedDate = styled.h2`
  margin: 0;

  @media (max-width: 420px) {
    font-size: 18px;
  }
`;

const CardDate = ({ date, time }) => {
  // TODO: If date is today or yesterday, change formattedDate to "Today" or "Yesterday"
  const formattedDate = new Date(date);
  const formattedTime = time.split('.')[0];

  return (
    <Wrapper>
      <FormattedDate>{formattedDate.toDateString()}</FormattedDate>
      <FormattedTime>{formattedTime}</FormattedTime>
    </Wrapper>
  );
};

CardDate.propTypes = {
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default CardDate;
