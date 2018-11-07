import styled from 'styled-components';

const FormHeader = styled.div`
  padding: 30px 0;

  @media (max-width: 420px) {
    padding: 10px 0;

    > h1 {
      margin: 0;
    }
  }
`;

export default FormHeader;
