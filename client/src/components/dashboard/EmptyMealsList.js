import React from 'react';
import styled from 'styled-components';
import img from '../../assets/img/empty.png';

const Wrapper = styled.div`
  text-align: center;
`;

const Image = styled.img`
  width: 150px;
`;

const Headline = styled.h2`
  color: #f6cd48;
`;

const EmptyMealsList = () => (
  <Wrapper>
    <Image src={img} />
    <Headline>Add your first meal</Headline>
  </Wrapper>
);

export default EmptyMealsList;
