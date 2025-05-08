import { useEffect, useRef, useState, useCallback } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { getBoundingBoxForText } from '../utils/pdf';
import type { Highlight, TextItem } from '../types';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

const scale = 1; 

interface UsePdfViewerReturn {
    numPages: number;
    canvasRefs: React.RefObject<(HTMLCanvasElement | null)[]>;
    error: string | null;
    highlights: Highlight[];
}

const usePdfViewer = (pdfUrl: string, highlightedText: string): UsePdfViewerReturn => {
    const [numPages, setNumPages] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [highlights, setHighlights] = useState<Highlight[]>([]);

    const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
    const textContentsRef = useRef<TextItem[][]>([]);

    const calculateHighlights = useCallback(() => {
        if (!highlightedText) {
            setHighlights([]);
            return;
        }

        const newHighlights = textContentsRef.current.map((textItems, index) => {
            const boundingBox = getBoundingBoxForText(textItems, highlightedText);
            if (boundingBox) {
                const [minX, minY, maxX, maxY] = boundingBox;
                const scaledBoundingBox = [
                    minX * scale,
                    minY * scale,
                    maxX * scale,
                    maxY * scale
                ];
                return { page: index + 1, text: highlightedText, rects: [scaledBoundingBox] };
            }
            return null;
        }).filter(Boolean) as Highlight[];

        setHighlights(newHighlights);
    }, [highlightedText]);

    const loadPdf = useCallback(async (): Promise<void> => {
        try {
            const loadingTask: pdfjs.PDFDocumentProxy = await pdfjs.getDocument(pdfUrl).promise;

            setNumPages(loadingTask.numPages);

            const renderPromises: Promise<void>[] = Array.from({ length: loadingTask.numPages }, async (_, pageNum) => {
                const page: pdfjs.PDFPageProxy = await loadingTask.getPage(pageNum + 1);
                const textContent = await page.getTextContent();
                const viewport: pdfjs.PageViewport = page.getViewport({ scale });
                const canvas: HTMLCanvasElement | null = canvasRefs.current[pageNum];

                if (canvas) {
                    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
                    if (context) {
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        context.fillStyle = 'white';
                        context.fillRect(0, 0, canvas.width, canvas.height);

                        textContentsRef.current[pageNum] = textContent.items as TextItem[];

                        await page.render({
                            canvasContext: context,
                            viewport: viewport,
                        }).promise;
                    }
                }
            });

            await Promise.allSettled(renderPromises);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while loading the PDF.');
        }
    }, [pdfUrl]);

    useEffect(() => {
        loadPdf();
    }, [pdfUrl, loadPdf]);

    useEffect(() => {
        calculateHighlights();
    }, [highlightedText, calculateHighlights]);

    return { numPages, canvasRefs, error, highlights };
};

export default usePdfViewer;