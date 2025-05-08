import styled from 'styled-components';

export const PdfViewerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
`;

export const PdfViewerPage = styled.div`
    position: relative;
`;

export const PdfViewerCanvas = styled.canvas`
    width: 100%;
    height: 100%;
`;

export const PdfViewerError = styled.div`
    color: var(--color-red);
`;