import styled from 'styled-components';

export const HighlightItem = styled.div<{ $rect: number[] }>`
    position: absolute;
    left: ${props => props.$rect[0]}px;
    bottom: ${props => props.$rect[1]}px;
    width: ${props => props.$rect[2] - props.$rect[0]}px;
    height: ${props => props.$rect[3] - props.$rect[1]}px;
    background-color: var(--color-light-yellow);
    pointer-events: none;
`;