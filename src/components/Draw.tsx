import { fixed_dist } from "./Utils";
import { block_size, map } from "./Map";
import { WIDTH, HEIGHT } from "./Player";

const pixel_size: number = 4;
const MODE: number = 1;

function get_side(ray_x: number, ray_y: number, angle: number): number {
    let sx: number = -1;
    let sy: number = -1;

    if (Math.cos(angle) > 0) sx = 1;
    if (Math.sin(angle) > 0) sy = 1;

    if (is_touch(ray_x - sx, ray_y, '1')) {
        if (sy == 1) return 3;
        return 1;
    }
    if (is_touch(ray_x, ray_y - sy, '1')) {
        if (sx == 1) return 4;
        return 2;
    }

    return 0;
}

function is_touch(x: number, y: number, c: any) {
    const block_x: number = x / block_size;
    const block_y: number = y / block_size;

    const map_x = Math.floor(block_x);
    const map_y = Math.floor(block_y);

    if (map_y < 0 || map_y >= map.length || map_x < 0 || map_x >= map[0].length) {
        return 1;
    }

    if (map[map_y][map_x] === c) return 1;

    return 0;
}

// const map = [
//     "1111111S11111111",
//     "1000000000000001",
//     "1000000000000001",
//     "1000000000000001",
//     "1000000000000001",
//     "1000000000000001",
//     "1000000000000001",
//     "1000000000000001",
//     "1000000000000001",
//     "1000000000000001",
//     "1000000000000001",
//     "111111111111N111",
// ];

function get_no(ray_x: number, angle: number) {
    let x = 0;
    let y = 0;

    while(map[y][x] != 'S')
    {
        x++;
        if(x == map[0].length)
        {
            x = 0;
            y++;
        }
    }
    x = x * block_size;

    let diff_x = ray_x - x;

    x = 0;
    y = 0;

    while(map[y][x] != 'N')
    {
        x++;
        if(x == map[0].length)
        {
            x = 0;
            y++;
        }
    }

    let no_y = y * block_size;
    let no_x = x * block_size + diff_x;

    return [no_x, no_y];
}


function draw_one_ray(ctx: any, player: any, ray_angle: number, i: number) {
    let ray_x: number = player.x;
    let ray_y: number = player.y;

    const cos_angle: number = Math.cos(ray_angle);
    const sin_angle: number = Math.sin(ray_angle);

    while (!is_touch(ray_x, ray_y, '1') && !is_touch(ray_x, ray_y, 'S') && !is_touch(ray_x, ray_y, 'N')) {
        ctx.fillStyle = "red";
        ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);

        ray_x += cos_angle;
        ray_y += sin_angle;
    }

    // If it touches the south side of the portal ('S'), continue from the north side ('N')
    if (is_touch(ray_x, ray_y, 'S')) {
        ctx.fillStyle = "black";
        // Get the new ray start position on the 'N' portal
        const [no_ray_x, no_ray_y] = get_no(ray_x, ray_angle);
        ray_x = no_ray_x;
        ray_y = no_ray_y;
        ray_x += cos_angle;
        ray_y += sin_angle;

        while(!is_touch(ray_x, ray_y, '1'))
        {
            ctx.fillStyle = "red";
            ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);

            ray_x += cos_angle;
            ray_y += sin_angle;
        }
    }
}

// if(!MODE)
// {
//   const distance: number = fixed_dist(player.x, player.y, ray_x, ray_y, player, ray_angle);
//   const height: number = ((block_size / distance) * (WIDTH / 2)) * 1.3;
//   let start_y = (HEIGHT - height) / 2;
//   let end_y = start_y + height;
//   const intensity = Math.max(0, 255 - distance);

//   let angle: number = ray_angle;

//   if(get_side(ray_x, ray_y, ray_angle) == 1)
//     ctx.fillStyle = `rgb(${intensity}, 0, 0)`;
//   else if(get_side(ray_x, ray_y, ray_angle) == 2)
//     ctx.fillStyle = `rgb(0, ${intensity}, 0)`;
//   else if(get_side(ray_x, ray_y, ray_angle) == 3)
//     ctx.fillStyle = `rgb(0, 0, ${intensity})`;
//   else if(get_side(ray_x, ray_y, ray_angle) == 4)
//     ctx.fillStyle = `rgb(${intensity}, 0, ${intensity})`;

//   if(start_y < 0)
//     start_y = 0;
//   if(end_y > HEIGHT)
//     end_y = HEIGHT;

//   let middle_up: number = start_y;
//   let middle_low: number = end_y;
//   while(middle_up < (HEIGHT / 2) + 1 && middle_low > (HEIGHT / 2) - 1)
//   {
//     ctx.fillRect(i, middle_up, pixel_size, pixel_size);
//     ctx.fillRect(i, middle_low, pixel_size, pixel_size);
//     middle_up += pixel_size - 1;
//     middle_low -= pixel_size - 1;
//   }
// }

export { draw_one_ray, pixel_size, MODE, is_touch };
