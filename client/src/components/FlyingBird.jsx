import { styled } from "styled-components";

export const BirdAnimation = styled.div`
position: absolute;
top: ${props => props.top}px;
left: ${props => props.left}px;
animation: fly ${props => props.duration}s linear infinite;
transform-origin: center center;

@keyframes fly {
  0% {
    transform: translateX(0) rotate(30deg);
  }
  100% {
    transform: translateX(calc(80vw + 70px)) rotate(-30deg);
  }
}
`;
