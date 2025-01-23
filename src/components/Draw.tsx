import { fixed_dist } from "./Utils";
import { block_size, map, map_structure } from "./Map";
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

function get_no(ray_x: number, angle: number) 
{
    let diff_x = ray_x - map_structure.sout_x;
    let no_x = map_structure.north_x + diff_x;
    return [no_x, map_structure.north_y];
}
function get_so(ray_x: number, angle: number) 
{
    let diff_x = ray_x - map_structure.north_x;
    let so_x = map_structure.sout_x + diff_x;
    return [so_x, map_structure.sout_y];
}


function draw_one_ray(ctx: any, player: any, ray_angle: number, i: number) {
    let ray_x: number = player.x;
    let ray_y: number = player.y;

    const cos_angle: number = Math.cos(player.angle);
    const sin_angle: number = Math.sin(player.angle);

    while (!is_touch(ray_x, ray_y, '1') && !is_touch(ray_x, ray_y, 'S') && !is_touch(ray_x, ray_y, 'N')) {
        ctx.fillStyle = "red";
        ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);

        ray_x += cos_angle;
        ray_y += sin_angle;
    }
    if (is_touch(ray_x, ray_y, 'S')) {
        const [no_ray_x, no_ray_y] = get_no(ray_x, player.angle);
        ray_x = no_ray_x + cos_angle;
        ray_y = no_ray_y + sin_angle;

        while(!is_touch(ray_x, ray_y, '1'))
        {
            ctx.fillStyle = "red";
            ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);

            ray_x += cos_angle;
            ray_y += sin_angle;
        }
    }
    else if(is_touch(ray_x, ray_y, 'N'))
    {
        const [so_ray_x, so_ray_y] = get_so(ray_x, player.angle);
        ray_x = so_ray_x + cos_angle;
        ray_y = so_ray_y + sin_angle;

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
