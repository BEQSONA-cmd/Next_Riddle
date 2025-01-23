function fixed_dist(x1: number, y1: number, x2: number, y2: number)
{
    const delta_x: number = x2 - x1;
    const delta_y: number = y2 - y1;
    let fix_dist: number = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    return fix_dist;
}

export { fixed_dist };
