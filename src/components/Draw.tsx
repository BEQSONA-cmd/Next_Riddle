import { fixed_dist } from "./Utils";
import { block_size, map, map_structure } from "./Map";
import { WIDTH, HEIGHT } from "./Player";
import { IAngle, IPlayer } from "@/utils/types";

const pixel_size: number = 4;
const MODE: number = 0;

function get_side(ray_x: number, ray_y: number, angle: IAngle): number {
    let sx: number = -1;
    let sy: number = -1;
    
    if (angle.cos_angle> 0) sx = 1;
    if (angle.sin_angle > 0) sy = 1;

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

function is_touch(x: number, y: number, c: any) 
{
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

function get_no(ray_x: number, x: number)
{
    let diff_x = ray_x - x;
    let no_x = map_structure.north_x + diff_x;
    return [no_x, map_structure.north_y];
}

function get_so(ray_x: number, x: number)
{
    let diff_x = ray_x - x;
    let so_x = map_structure.sout_x + diff_x;
    return [so_x, map_structure.sout_y];
}

function get_we(ray_x: number, x: number)
{
    let diff_x = ray_x - x;
    let we_y = map_structure.west_y + diff_x;
    return [map_structure.west_x, we_y];
}

function get_ea(ray_x: number, x : number)
{
    let diff_x = ray_x - x;
    let ea_y = map_structure.east_y + diff_x;
    return [map_structure.east_x, ea_y];
}

function run_3d(ctx: any, player: IPlayer, angle: IAngle, i: number, distance: number, ray_x: number, ray_y: number)
{
    // distance *= Math.cos(angle.angle - player.angle);
    const height: number = ((block_size / distance) * (WIDTH / 2)) * 1.3;
    let start_y = (HEIGHT - height) / 2;
    let end_y = start_y + height;
    //   const intensity = Math.max(0, 255 - distance);
    const intensity = 255;

    ctx.fillStyle = "black";
    if(get_side(ray_x, ray_y, angle) == 1)
        ctx.fillStyle = `rgb(${intensity}, 0, 0)`;
    else if(get_side(ray_x, ray_y, angle) == 2)
        ctx.fillStyle = `rgb(0, ${intensity}, 0)`;
    else if(get_side(ray_x, ray_y, angle) == 3)
        ctx.fillStyle = `rgb(0, 0, ${intensity})`;
    else if(get_side(ray_x, ray_y, angle) == 4)
        ctx.fillStyle = `rgb(${intensity}, 0, ${intensity})`;

    if(start_y < 0)
        start_y = 0;
    if(end_y > HEIGHT)
        end_y = HEIGHT;

    let middle_up: number = start_y;
    let middle_low: number = end_y;
    while(middle_up < (HEIGHT / 2) + 1 && middle_low > (HEIGHT / 2) - 1)
    {
        ctx.fillRect(i, middle_up, pixel_size, pixel_size);
        ctx.fillRect(i, middle_low, pixel_size, pixel_size);
        middle_up += pixel_size - 1;
        middle_low -= pixel_size - 1;
    }
}

function draw_one_ray(ctx: any, player: any, angle: IAngle, i: number, portalnum: number = 0): number
{
    let ray_x: number = player.x;
    let ray_y: number = player.y;
    let ray_angle: number = angle.angle;

    let cos_angle: number = angle.cos_angle;
    let sin_angle: number = angle.sin_angle;

    if(portalnum > 2) return 0;

    while (!is_touch(ray_x, ray_y, '1') && !is_touch(ray_x, ray_y, 'S') && !is_touch(ray_x, ray_y, 'N') && !is_touch(ray_x, ray_y, 'W') && !is_touch(ray_x, ray_y, 'E'))
    {
        if(MODE)
        {
            ctx.fillStyle = "red";
            ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);
        }

        ray_x += cos_angle;
        ray_y += sin_angle;
    }
    
    let distance = fixed_dist(player.x, player.y, ray_x, ray_y);

    let new_player = { x: 0, y: 0, angle: 0}
    let new_angle = { cos_angle: 0, sin_angle: 0, angle: 0,}

    if (is_touch(ray_x, ray_y, 'S')) 
    {
        let [no_ray_x, no_ray_y] = [0, 0];

        if(map_structure.north)
            [no_ray_x, no_ray_y] = get_no(ray_x, map_structure.sout_x);
        else if(map_structure.west)
        {
            let diff_x = ray_x - map_structure.sout_x;
            no_ray_y = map_structure.west_y - diff_x + block_size;
            no_ray_x = map_structure.west_x;

            angle.cos_angle = Math.cos(angle.angle - Math.PI / 2);
            angle.sin_angle = Math.sin(angle.angle - Math.PI / 2);
            new_angle.angle = angle.angle - Math.PI / 2;
            new_player.angle = player.angle - Math.PI / 2;

        }
        else if(map_structure.east)
        {
            [no_ray_x, no_ray_y] = get_ea(ray_x, map_structure.sout_x);

            angle.cos_angle = Math.cos(angle.angle + Math.PI / 2);
            angle.sin_angle = Math.sin(angle.angle + Math.PI / 2);
            new_angle.angle = angle.angle + Math.PI / 2;
            new_player.angle = player.angle + Math.PI / 2;
        }
        new_angle.cos_angle = angle.cos_angle;
        new_angle.sin_angle = angle.sin_angle;
        new_player.x = no_ray_x + angle.cos_angle;
        new_player.y = no_ray_y + angle.sin_angle;

        distance += draw_one_ray(ctx, new_player, new_angle, i, portalnum + 1);
        return distance;

    }
    else if(is_touch(ray_x, ray_y, 'N'))
    {
        let [so_ray_x, so_ray_y] = [0, 0];
        if(map_structure.south)
        {
            [so_ray_x, so_ray_y] = get_so(ray_x, map_structure.north_x);
        }
        else if(map_structure.west)
        {
            [so_ray_x, so_ray_y] = get_we(ray_x, map_structure.north_x);

            angle.cos_angle = Math.cos(angle.angle + Math.PI / 2);
            angle.sin_angle = Math.sin(angle.angle + Math.PI / 2);
            new_angle.angle = angle.angle + Math.PI / 2;
            new_player.angle = player.angle + Math.PI / 2;
        }
        else if(map_structure.east)
        {
            let diff_x = ray_x - map_structure.north_x;
            so_ray_y = map_structure.east_y - diff_x + block_size;
            so_ray_x = map_structure.east_x;

            angle.cos_angle = Math.cos(angle.angle - Math.PI / 2);
            angle.sin_angle = Math.sin(angle.angle - Math.PI / 2);
            new_angle.angle = angle.angle - Math.PI / 2;
            new_player.angle = player.angle - Math.PI / 2;
        }

        new_player.x = so_ray_x + angle.cos_angle;
        new_player.y = so_ray_y + angle.sin_angle;
        new_angle.cos_angle = angle.cos_angle;
        new_angle.sin_angle = angle.sin_angle;

        distance += draw_one_ray(ctx, new_player, new_angle, i, portalnum + 1);
        return distance;
    }
    else if(is_touch(ray_x, ray_y, 'W'))
    {
        let [ea_ray_x, ea_ray_y] = [0, 0];
        if(map_structure.east)
        {
            [ea_ray_x, ea_ray_y] = get_ea(ray_y, map_structure.west_y);
        }
        else if(map_structure.north)
        {
            [ea_ray_x, ea_ray_y] = get_no(ray_y, map_structure.west_y);

            angle.cos_angle = Math.cos(angle.angle - Math.PI / 2);
            angle.sin_angle = Math.sin(angle.angle - Math.PI / 2);
            new_angle.angle = angle.angle - Math.PI / 2;
            new_player.angle = player.angle - Math.PI / 2;
        }
        else if(map_structure.south)
        {
            let diff_x = ray_y - map_structure.west_y;
            ea_ray_y = map_structure.sout_y;
            ea_ray_x = map_structure.sout_x - diff_x + block_size;

            angle.cos_angle = Math.cos(angle.angle + Math.PI / 2);
            angle.sin_angle = Math.sin(angle.angle + Math.PI / 2);
            new_angle.angle = angle.angle + Math.PI / 2;
            new_player.angle = player.angle + Math.PI / 2;
        }
        new_player.x = ea_ray_x + angle.cos_angle;
        new_player.y = ea_ray_y + angle.sin_angle;
        new_angle.cos_angle = angle.cos_angle;
        new_angle.sin_angle = angle.sin_angle;

        distance += draw_one_ray(ctx, new_player, new_angle, i, portalnum + 1);
        return distance;

    }
    else if(is_touch(ray_x, ray_y, 'E'))
    {
        let [we_ray_x, we_ray_y] = [0, 0];
        if(map_structure.west)
        {
            [we_ray_x, we_ray_y] = get_we(ray_y, map_structure.east_y);
        }
        else if(map_structure.north)
        {
            let diff_x = ray_y - map_structure.east_y;
            we_ray_y = map_structure.north_y;
            we_ray_x = map_structure.north_x - diff_x + block_size;

            angle.cos_angle = Math.cos(angle.angle + Math.PI / 2);
            angle.sin_angle = Math.sin(angle.angle + Math.PI / 2);
            new_angle.angle = angle.angle + Math.PI / 2;
            new_player.angle = player.angle + Math.PI / 2;
        }
        else if(map_structure.south)
        {
            [we_ray_x, we_ray_y] = get_so(ray_y, map_structure.east_y);
            angle.cos_angle = Math.cos(angle.angle - Math.PI / 2);
            angle.sin_angle = Math.sin(angle.angle - Math.PI / 2);
            new_angle.angle = angle.angle - Math.PI / 2;
            new_player.angle = player.angle - Math.PI / 2;
        }

        new_player.x = we_ray_x + angle.cos_angle;
        new_player.y = we_ray_y + angle.sin_angle;
        new_angle.cos_angle = angle.cos_angle;
        new_angle.sin_angle = angle.sin_angle;

        distance += draw_one_ray(ctx, new_player, new_angle, i, portalnum + 1);

        return distance;
        
    }

    if(!MODE)
    {
        // distance *= Math.cos(angle.angle - player.angle);
        const height: number = ((block_size / distance) * (WIDTH / 2));
        let start_y = (HEIGHT - height) / 2;
        let end_y = start_y + height;
        //   const intensity = Math.max(0, 255 - distance);
        const intensity = 255;

        ctx.fillStyle = "black";
        if(get_side(ray_x, ray_y, angle) == 1)
            ctx.fillStyle = `rgb(${intensity}, 0, 0)`;
        else if(get_side(ray_x, ray_y, angle) == 2)
            ctx.fillStyle = `rgb(0, ${intensity}, 0)`;
        else if(get_side(ray_x, ray_y, angle) == 3)
            ctx.fillStyle = `rgb(0, 0, ${intensity})`;
        else if(get_side(ray_x, ray_y, angle) == 4)
            ctx.fillStyle = `rgb(${intensity}, 0, ${intensity})`;

        if(start_y < 0)
            start_y = 0;
        if(end_y > HEIGHT)
            end_y = HEIGHT;

        let middle_up: number = start_y;
        let middle_low: number = end_y;
        while(middle_up < (HEIGHT / 2) + 1 && middle_low > (HEIGHT / 2) - 1)
        {
            ctx.fillRect(i, middle_up, pixel_size, pixel_size);
            ctx.fillRect(i, middle_low, pixel_size, pixel_size);
            middle_up += pixel_size - 1;
            middle_low -= pixel_size - 1;
        }
    }
    return 0
}

export { draw_one_ray, pixel_size, MODE, is_touch, get_side, get_no, get_so, get_we, get_ea, run_3d };
