import styled from 'styled-components';

const Input = styled.input`
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 70%;
  border: ${props => (props.invalid ? '2px solid #ff387b' : '2px solid #f6f6f6')} ;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  outline: none;

  &:focus {
    box-shadow: 0 0 5px #ff9a00;
  }
`;

export default Input;
