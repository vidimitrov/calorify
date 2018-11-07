import styled from 'styled-components';

const CardStatus = styled.div`
  background-color: ${props => (props.inRange ? 'rgb(153, 204, 0)' : '#ff387b')};
  height: 100%;
  width: 10px;
  border-radius: 3px;
`;

export default CardStatus;
