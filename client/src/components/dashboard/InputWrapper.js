import styled, { css } from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: 20px;

  ${props => props.invalid && css`
    margin-bottom: 5px
  `}}
`;

export default InputWrapper;
