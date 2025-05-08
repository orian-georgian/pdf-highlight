export type BoundingBox = {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
};

export type BoundingBoxResult = [number, number, number, number] | null;