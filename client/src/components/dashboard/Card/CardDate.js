import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`
  color: #f0cd61;
  margin: 0px 20px;
  max-width: 100px;
`;

const FormattedDate = styled.h3`
  margin: 0;
  color: #c7b26e;

  @media (max-width: 420px) {
    font-size: 18px;
  }
`;

const CardDate = ({ date }) => {
  const formattedDate = moment(date).calendar();

  return (
    <Wrapper>
      <FormattedDate>{formattedDate}</FormattedDate>
    </Wrapper>
  );
};

CardDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default CardDate;
