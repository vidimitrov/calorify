import styled from 'styled-components';

const Card = styled.div`
  background-color: #fefbf0;
  font-family: Roboto;
  color: #f6cd48;
  width: 98%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto 20px;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px -1px rgba(254, 244, 192, 0.2), 
              0px 4px 5px 0px rgba(0, 0, 0, 0.08), 
              0px 1px 10px 0px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 420px) {
    height: 150px;
  }
`;

export default Card;
