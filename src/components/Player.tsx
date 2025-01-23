import { is_touch } from "./Draw";
import { map_structure, block_size } from "./Map";
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

// function update_position(player: any, keys: any, map: any) 
// {
//     const angle_speed: number = 0.1;

//     if (keys["ArrowLeft"]) {
//         player.angle -= angle_speed;
//     } else if (keys["ArrowRight"]) {
//         player.angle += angle_speed;
//     }

//     const cos_angle = Math.cos(player.angle);
//     const sin_angle = Math.sin(player.angle);

//     let dx = 0;
//     let dy = 0;

//     if (keys["w"]) {
//         dx += cos_angle * player.speed;
//         dy += sin_angle * player.speed;
//     } else if (keys["s"]) {
//         dx -= cos_angle * player.speed;
//         dy -= sin_angle * player.speed;
//     }

//     if (keys["a"]) {
//         dx += sin_angle * player.speed;
//         dy -= cos_angle * player.speed;
//     } else if (keys["d"]) {
//         dx -= sin_angle * player.speed;
//         dy += cos_angle * player.speed;
//     }

//     player.x += dx;
//     if (is_touch(player.x, player.y, '1'))
//         player.x -= dx;
//     else if (is_touch(player.x, player.y, 'S'))
//     {
//         if(map_structure.north)
//         {
//             player.x = map_structure.north_x + block_size - 1;
//             player.y = map_structure.north_y;
//         }
//         else if(map_structure.west)
//         {
//             player.x = map_structure.west_x;
//             player.y = map_structure.west_y + block_size - 1;
//         }
//         else if(map_structure.east)
//         {
//             player.x = map_structure.east_x + block_size - 1;
//             player.y = map_structure.east_y;
//         }
//     }

//     player.y += dy;
//     if (is_touch(player.x, player.y, '1'))
//         player.y -= dy;
//     else if (is_touch(player.x, player.y, 'S'))
//     {
//         if(map_structure.north)
//         {
//             player.x = map_structure.north_x + block_size - 1;
//             player.y = map_structure.north_y;
//         }
//         else if(map_structure.west)
//         {
//             player.x = map_structure.west_x;
//             player.y = map_structure.west_y + block_size - 1;
//         }
//         else if(map_structure.east)
//         {
//             player.x = map_structure.east_x + block_size - 1;
//             player.y = map_structure.east_y;
//         }
//     }

//     player.dx = dx;
//     player.dy = dy;
// }

export {player, WIDTH, HEIGHT };
