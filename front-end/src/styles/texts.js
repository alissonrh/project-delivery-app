import styled from 'styled-components';
import {
  SIZE_FONT_SMALL,
  SIZE_FONT_MEDIUM,
  SIZE_FONT_LARGE,
  TYPOGRAPHY } from './typography';

export const TextSmall = styled.text`
    font-size: ${SIZE_FONT_SMALL};
    font-family: ${TYPOGRAPHY};
`;

export const TextMedium = styled.text`
    font-size: ${SIZE_FONT_MEDIUM};
    font-family: ${TYPOGRAPHY};
`;

export const TextLarge = styled.text`
    font-size: ${SIZE_FONT_LARGE};
    font-family: ${TYPOGRAPHY};
`;
