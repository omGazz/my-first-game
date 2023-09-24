export const gridCells = n => {
    return n * 16;
}

export const isSPaceFree = (walls, x, y) => {

    const str = `${x},${y}`;
    const isWallPresent = walls.has(str);

    return !isWallPresent;
}