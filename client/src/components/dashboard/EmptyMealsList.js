import React from 'react';
import styled from 'styled-components';
import img from '../../assets/img/empty.png';

const Wrapper = styled.div`
  text-align: center;
`;

const Image = styled.img`
  width: 350px;

  @media (max-width: 420px) {
    width: 150px;
  }
`;

const Headline = styled.h2`
  color: #f6cd48;
  font-size: 32px;
    margin: 40px auto 0;

  @media (max-width: 420px) {
    width: 150px;
    font-size: 28px;
  }
`;

const EmptyMealsList = () => (
  <Wrapper>
    <Image src={img} />
    <Headline>Add your first meal</Headline>
  </Wrapper>
);

export default EmptyMealsList;
