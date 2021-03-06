import styled from 'styled-components';

const SubmitButton = styled.button`
  background-color: #e5c769;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(233, 193, 95, 0.4);
  box-shadow: 0 10px 30px 0 rgba(233, 193, 95, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 20px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  &:disabled {
    background-color: #f6f6f6;
    color: #c2bcbc;
    box-shadow: none;
  }
`;

export default SubmitButton;
