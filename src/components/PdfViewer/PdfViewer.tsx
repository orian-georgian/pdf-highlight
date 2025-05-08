import React, { type ReactNode } from 'react';
import usePdfViewer from '../../hooks/usePdfViewer';
import { useSelectedText } from '../../contexts/SelectedTextContext';
import {HighlightZone} from '../../components/HighlightZone';

import { PdfViewerContainer, PdfViewerPage, PdfViewerCanvas, PdfViewerError} from './PdfViewer.styles';

interface PdfViewerProps {
    pdfUrl: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }): ReactNode => {
    const { selectedText } = useSelectedText();
    const { numPages, canvasRefs, error, highlights } = usePdfViewer(pdfUrl, selectedText?.content || '');
    
    const setCanvasRef = (index: number) => (ref: HTMLCanvasElement) => {
        canvasRefs.current[index] = ref;
    }

    if (error) {
        return <PdfViewerError>Error: {error}</PdfViewerError>;
    }

    return (
        <PdfViewerContainer>
            {Array.from({ length: numPages }, (_, index) => (
                <PdfViewerPage key={index} >
                    <PdfViewerCanvas ref={setCanvasRef(index)} />
                    <HighlightZone highlights={highlights} index={index} />
                </PdfViewerPage>
            ))}
        </PdfViewerContainer>
    );
};

