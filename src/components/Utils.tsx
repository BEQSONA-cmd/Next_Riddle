import { block_size, map } from "./Map";

function is_not_wall(x: number, y: number) 
{
  const block_x: number = x / block_size;
  const block_y: number = y / block_size;

  if (map[Math.floor(block_y)][Math.floor(block_x)] === "1")
    return false;

  return true;
}

function fixed_dist(x1: number, y1: number, x2: number, y2: number, player: any, start_x: number)
{
    const delta_x: number = x2 - x1;
    const delta_y: number = y2 - y1;
    let fix_dist: number = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    fix_dist *= Math.cos(start_x - player.angle)
    return fix_dist;
}

export { is_not_wall, fixed_dist };;
// ...existing code...