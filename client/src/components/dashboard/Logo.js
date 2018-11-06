import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Logo = styled.img.attrs({
  alt: 'logo',
})`
  animation: ${rotate} infinite 20s linear;
  height: 40vmin;
  src: url(${props => props.src});
`;

export default Logo;
