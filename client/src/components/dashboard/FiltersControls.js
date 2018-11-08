import styled from 'styled-components';

const FiltersControls = styled.div`
  display: ${props => (props.visible ? 'inline-block' : 'none')};
  flex-grow: 1;

  > div {
    margin: 0 10px;
  }

  @media (max-width: 420px) {
    > div {
      margin: 10px;
    }
  }
`;

export default FiltersControls;
