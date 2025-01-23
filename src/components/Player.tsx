import { map, block_size } from "./Map";
const WIDTH = 800;
const HEIGHT = 600;

const player = {
    x: WIDTH / 2 - 25,
    y: HEIGHT / 2 - 25,
    angle: Math.PI + Math.PI / 2,
    width: 5,
    height: 5,
    color: "yellow",
    speed: 5,
    dx: 0,
    dy: 0,
};

function is_not_wall(x: number, y: number) 
{
  const block_x: number = x / block_size;
  const block_y: number = y / block_size;

  if (map[Math.floor(block_y)][Math.floor(block_x)] === "1")
    return false;

  return true;
}

function update_position(player: any, keys: any, map: any) 
{
    const angle_speed: number = 0.1;

    if (keys["ArrowLeft"]) {
        player.angle -= angle_speed;
    } else if (keys["ArrowRight"]) {
        player.angle += angle_speed;
    }

    const cos_angle = Math.cos(player.angle);
    const sin_angle = Math.sin(player.angle);

    let dx = 0;
    let dy = 0;

    if (keys["w"]) {
        dx += cos_angle * player.speed;
        dy += sin_angle * player.speed;
    } else if (keys["s"]) {
        dx -= cos_angle * player.speed;
        dy -= sin_angle * player.speed;
    }

    if (keys["a"]) {
        dx += sin_angle * player.speed;
        dy -= cos_angle * player.speed;
    } else if (keys["d"]) {
        dx -= sin_angle * player.speed;
        dy += cos_angle * player.speed;
    }

    player.x += dx;
    if (!is_not_wall(player.x, player.y)) {
        player.x -= dx;
    }

    player.y += dy;
    if (!is_not_wall(player.x, player.y)) {
        player.y -= dy;
    }

    player.dx = dx;
    player.dy = dy;
}

export { update_position, player, WIDTH, HEIGHT };
