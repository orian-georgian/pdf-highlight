import type { BoundingBox, BoundingBoxResult, TextItem } from "../types";
import { getStringDifference } from "./string";

const OFFSET = 10;

export const getBoundingBoxForText = (textArray: TextItem[], targetText: string): BoundingBoxResult => {
    const normalizedTargetText = targetText.replace(/\s+|\p{P}+/gu, '').trim();
    let accumulatedText = '';
    let isMatching = false;
    let boundingBox: BoundingBox = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };

    function updateBoundingBox(bbox: BoundingBox, item: TextItem) {
        const { transform, width, height } = item;
        const x = transform[4] - OFFSET;
        const y = transform[5] + transform[3] + OFFSET;

        bbox.minX = Math.min(bbox.minX, x);
        bbox.minY = Math.min(bbox.minY, y - height - OFFSET);
        bbox.maxX = Math.max(bbox.maxX, x + width + OFFSET * 2);
        bbox.maxY = Math.max(bbox.maxY, y);
    }

    function resetMatchingState() {
        accumulatedText = '';
        isMatching = false;
        boundingBox = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    }

    for (const item of textArray) {
        const normalizedItemText = item.str.replace(/\s+|\p{P}+/gu, '').trim();

        if (normalizedTargetText.includes(normalizedItemText)) {
            if (!isMatching && normalizedTargetText.startsWith(normalizedItemText)) {
                isMatching = true;
            }

            if (isMatching) {
                accumulatedText += normalizedItemText;
                updateBoundingBox(boundingBox, item);

                if (accumulatedText === normalizedTargetText) {
                    return [boundingBox.minX, boundingBox.minY, boundingBox.maxX, boundingBox.maxY];
                }
            }
        } else if (isMatching && normalizedItemText.startsWith(getStringDifference(normalizedTargetText, accumulatedText))) {
            accumulatedText += getStringDifference(normalizedTargetText, accumulatedText);
            updateBoundingBox(boundingBox, item);

            if (accumulatedText === normalizedTargetText) {
                return [boundingBox.minX, boundingBox.minY, boundingBox.maxX, boundingBox.maxY];
            }
        } else if (isMatching) {
            resetMatchingState();
        }
    }

    return null;
}