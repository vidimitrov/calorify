import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: #f0cd61;
  margin: 0px 20px;
  flex-grow:1;

  @media (max-width: 420px) {
    min-width: 70px;
    margin: 0px 15px;
    width: 200px;
  }
`;

const Title = styled.h1`
  margin: 0;

  @media (max-width: 420px) {
    font-size: 18px;
  }
`;

const Subtitle = styled.h3`
  margin: 0;
  color: #c7b26e;

  @media (max-width: 420px) {
    font-size: 16px;
    word-break: break-all;
  }
`;

const CardInfo = ({ title, subtitle }) => (
  <Wrapper>
    <Title name="card-info-title">{title}</Title>
    <Subtitle name="card-info-subtitle">{subtitle}</Subtitle>
  </Wrapper>
);

CardInfo.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default CardInfo;
