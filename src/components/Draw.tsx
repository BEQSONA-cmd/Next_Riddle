import { fixed_dist } from "./Utils";
import { block_size, map_structure } from "./Map";
import { IAngle, IRay } from "@/utils/types";
import { is_touch_thin, touch_any, get_side, is_touch_side } from "./Touch"; 
import { pixel_size, MAX_RECURSION, MODE } from "./Settings";
import draw_one_line  from "./Line";

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

function draw_one_ray(ctx: any, player: any, angle: IAngle, i: number, portalnum: number = 0): any
{
    let ray_x: number = player.x;
    let ray_y: number = player.y;

    if(portalnum > MAX_RECURSION) return [0, { x: 0, y: 0 }];

    while (!is_touch_side(ray_x, ray_y, angle, portalnum))
    {
        if(MODE)
        {
            ctx.fillStyle = "red";
            ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);
        }

        ray_x += angle.cos_angle;
        ray_y += angle.sin_angle;
    }
    let ray: IRay = { x: ray_x, y: ray_y };
    let distance = fixed_dist(player.x, player.y, ray_x, ray_y);

    let new_player = { x: 0, y: 0, angle: 0}
    let new_angle = { cos_angle: 0, sin_angle: 0, angle: 0,}

    let old_angle: IAngle = { cos_angle: angle.cos_angle, sin_angle: angle.sin_angle, angle: angle.angle };

    if (is_touch_thin(ray_x, ray_y, 'S'))
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

        let [dist, new_ray] = draw_one_ray(ctx, new_player, new_angle, i, portalnum + 1);
        distance += dist;
        ray = new_ray;
    }
    else if(is_touch_thin(ray_x, ray_y, 'N'))
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

        let [dist, new_ray] = draw_one_ray(ctx, new_player, new_angle, i, portalnum + 1);
        distance += dist;
        ray = new_ray;
    }
    else if(is_touch_thin(ray_x, ray_y, 'W'))
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

        let [dist, new_ray] = draw_one_ray(ctx, new_player, new_angle, i, portalnum + 1);
        distance += dist;
        ray = new_ray;
    }
    else if(is_touch_thin(ray_x, ray_y, 'E'))
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

        let [dist, new_ray] = draw_one_ray(ctx, new_player, new_angle, i, portalnum + 1);
        distance += dist;
        ray = new_ray;
    }

    if(!MODE)
    {
        distance *= Math.cos(angle.angle - player.angle);
        draw_one_line(ctx, player, angle, i, distance, ray, old_angle);
    }
    return [distance, ray];
}

export { draw_one_ray, pixel_size, MODE, touch_any, is_touch_thin, get_side, get_no, get_so, get_we, get_ea };
