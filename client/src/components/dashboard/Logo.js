import styled from 'styled-components';

const Logo = styled.img.attrs({
  alt: 'logo',
})`
  height: 25px;
  margin-right: 10px;
  src: url(${props => props.src});
`;

export default Logo;
