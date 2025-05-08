import { useEffect, useRef } from "react";
import type { Highlight } from "../../types";
import { HighlightItem } from "./HighlightZone.styles";

interface HighlightZoneProps {
    highlights: Highlight[];
    index: number;
}

export const HighlightZone: React.FC<HighlightZoneProps> = ({ highlights, index }) => {
    const firstHighlightRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (firstHighlightRef.current) {
            firstHighlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [highlights]);

    return highlights
        .filter(highlight => highlight.page === index + 1)
        .map((highlight, highlightIndex) => (
            highlight.rects.map((rect, rectIndex) => (
                rect.every(value => Number.isFinite(value)) && (
                    <HighlightItem
                        key={`${highlightIndex}-${rectIndex}`}
                        ref={highlightIndex === 0 && rectIndex === 0 ? firstHighlightRef : null}
                        data-highlight-index={`${highlightIndex}-${rectIndex}`}
                        $rect={rect}  
                    />
                )
            ))
    ))
}