import styled from 'styled-components';

const Filters = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.visible ? 'row' : 'row-reverse')};
  padding: ${props => (props.visible ? '16px 32px 0' : '8px 32px 0')};
  margin-bottom: 20px;
  text-align: right;
`;

export default Filters;
