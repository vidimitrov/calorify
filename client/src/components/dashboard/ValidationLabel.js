import styled, { css } from 'styled-components';

const ValidationLabel = styled.p`
  display: none;

  ${props => props.invalid && css`
    display: block;
    color: #ff387b;
    text-align: left;
    margin: 0;
    width: 85%;
  `}
`;

export default ValidationLabel;
