const rows = 10;
const cols = 20;

const textureWidth = 32;
const textureHeight = 32;

function getTile(data, index, hasLeft, hasRight, hasTop, hasBottom) {
    return {
        current: data.charAt(index),
        left: hasLeft ? data.charAt(index - 1) : null,
        right: hasRight ? data.charAt(index + 1) : null,
        top: hasTop ? data.charAt(index - cols) : null,
        bottom: hasBottom ? data.charAt(index + cols) : null,
        topLeft: hasLeft && hasTop ? data.charAt(index - cols - 1) : null,
        topRight: hasRight && hasTop ? data.charAt(index - cols + 1) : null,
        bottomLeft: hasLeft && hasBottom ? data.charAt(index + cols - 1) : null,
        bottomRight: hasRight && hasBottom ? data.charAt(index + cols + 1) : null
    };
}

export function evaluateTile(data, index, evaluationFn) {
    let row = parseInt(index / cols);
    let col = index % cols;
    let hasLeft = col > 0;
    let hasRight = col < cols - 1;
    let hasTop = row > 0;
    let hasBottom = row < rows - 1;

    let tile = {
        x: col * textureWidth,
        y: row * textureHeight,
        row: row,
        col: col,
        ground: getTile(data.ground, index, hasLeft, hasRight, hasTop, hasBottom),
        elevation: getTile(data.elevation, index, hasLeft, hasRight, hasTop, hasBottom),
        object: getTile(data.objects, index, hasLeft, hasTop, hasBottom)
    }
    return evaluationFn(tile);
}
