import styled from 'styled-components';
import { COLOR_GREEN } from '../styles/color';

export const Buttons = styled.button`
    background-color: ${(props) => props.color};
    width: 332px;
    height: 59px;
    border-radius: 10px;
`;

Buttons.defaultProps = {
  color: COLOR_GREEN,
};

export const ButtonBorder = styled.button`
    background-color: transparent;
    width: 332px;
    height: 59px;
    border-radius: 10px;
    border: 2px solid COLO R_GREEN;
`;
