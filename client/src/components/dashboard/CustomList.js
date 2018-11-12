import styled from 'styled-components';

const MealsList = styled.div`
  padding: ${props => (props.top ? '32px' : '0 32px 32px')};
  flex-grow: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default MealsList;
