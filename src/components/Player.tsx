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

function update_position(player: any, keys: any, map: any) 
{
    const angle_speed: number = 0.1;

    if (keys["ArrowLeft"])
        player.angle -= angle_speed;
    else if (keys["ArrowRight"])
        player.angle += angle_speed;

    const cos_angle = Math.cos(player.angle);
    const sin_angle = Math.sin(player.angle);

    if (keys["w"]) {
        player.dx = cos_angle * player.speed;
        player.dy = sin_angle * player.speed;
    } else if (keys["s"]) {
        player.dx = -cos_angle * player.speed;
        player.dy = -sin_angle * player.speed;
    } else {
        player.dx = 0;
        player.dy = 0;
    }

    if (keys["a"]) {
        player.dx += sin_angle * player.speed;
        player.dy -= cos_angle * player.speed;
    } else if (keys["d"]) {
        player.dx -= sin_angle * player.speed;
        player.dy += cos_angle * player.speed;
    }

    player.x += player.dx;
    player.y += player.dy;
}

export { update_position, player, WIDTH, HEIGHT };
