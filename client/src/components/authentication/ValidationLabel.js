import styled, { css } from 'styled-components';

const ValidationLabel = styled.p`
  ${props => !props.valid && css`
    color: #ff387b;
    text-align: left;
    margin: 0 auto 20px;
    width: 85%;
  `}
`;

export default ValidationLabel;
