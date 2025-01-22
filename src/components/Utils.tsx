import { block_size, map } from "./Map";

function is_not_wall(x: number, y: number) 
{
  const block_x: number = x / block_size;
  const block_y: number = y / block_size;

  if (map[Math.floor(block_y)][Math.floor(block_x)] === "1")
    return false;

  return true;
}

function fixed_dist(x1: number, y1: number, x2: number, y2: number, player: any)
{
  const delta_x: number = x2 - x1;
  const delta_y: number = y2 - y1;
  const angle: number = Math.atan2(delta_y, delta_x) - player.angle;
  const fix_dist: number = Math.sqrt(delta_x * delta_x + delta_y * delta_y) * Math.cos(angle);
  return fix_dist;
}

export { is_not_wall, fixed_dist };
