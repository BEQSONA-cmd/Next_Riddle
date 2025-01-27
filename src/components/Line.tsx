import { IPlayer, IAngle, IRay } from "@/utils/types";
import { block_size } from "./Map";
import { get_side, edge_of_wall, is_touch_thin } from "./Touch";

function draw_floor(ctx: any, i: number, end_y: number, height: number, player: IPlayer, ray_angle: IAngle, settings: any)
{
    let y = end_y;
    let block = 0;
    if(!player.change)
        block = block_size;

    while (y < height - settings.pixel_size) 
    {
        let distance = ((block_size / 3) * settings.HEIGHT) / (y - settings.HEIGHT / 2);
        distance /= Math.cos(ray_angle.angle - player.angle);

        const floor_x = (player.x + block) + distance * ray_angle.cos_angle;
        const floor_y = (player.y) + distance * ray_angle.sin_angle;

        const tile_x = Math.floor(floor_x / block_size);
        const tile_y = Math.floor(floor_y / block_size);

        let color: string = "";
        if ((tile_x + tile_y) % 2 === 0)
        {

            let color_1;
            if(settings.darkness)
                color_1 = Math.floor(255 - distance) / 2;
            else
                color_1 = 255 / 2;
            color = `rgb(${color_1}, ${color_1}, ${color_1})`;
        }
        else
        {
            let color_2;
            if(settings.darkness)
                color_2 = Math.floor(255 - distance) / 4;
            else
                color_2 = 255 / 4;
            color = `rgb(${color_2}, ${color_2}, ${color_2})`;
        }

        ctx.fillStyle = color;
        ctx.fillRect(i, y, settings.pixel_size, settings.pixel_size);

        y += settings.pixel_size / 2;
    }
}

function draw_ceiling(ctx: any, i: number, start_y: number, height: number, player: IPlayer, ray_angle: IAngle, settings: any)
{
    let y = start_y;
    let block = 0;
    if(player.change)
        block = block_size;
    ray_angle.angle = ray_angle.angle + Math.PI;
    while (y > 0) 
    {
        let distance = ((block_size / 3) * settings.HEIGHT) / (y - settings.HEIGHT / 2);
        distance /= Math.cos(ray_angle.angle - player.angle);

        const floor_x = (player.x + block) + distance * ray_angle.cos_angle;
        const floor_y = (player.y) + distance * ray_angle.sin_angle;

        const tile_x = Math.floor(floor_x / block_size);
        const tile_y = Math.floor(floor_y / block_size);

        let color: string = "";
        if ((tile_x + tile_y) % 2 === 0)
        {
            let color_1;
            if(settings.darkness)
                color_1 =  Math.floor(255 - distance);
            else
                color_1 = 255;
            color = `rgb(${color_1}, ${color_1}, ${color_1})`;
        }
        else
        {
            let color_2;
            if(settings.darkness)
                color_2 = Math.floor(255 - distance) / 2;
            else
                color_2 = 255 / 2;
            color = `rgb(${color_2}, ${color_2}, ${color_2})`;
        }

        ctx.fillStyle = color;
        ctx.fillRect(i, y, settings.pixel_size, settings.pixel_size);

        y -= settings.pixel_size / 2;
    }
}

function draw_one_line(ctx: any, player: IPlayer, angle: IAngle, i: number, distance: number, ray: IRay, old_angle: IAngle, draw_player: boolean, settings: any)
{
    const height: number = ((block_size / distance) * (settings.WIDTH / 2));
    let start_y: number = (settings.HEIGHT - height) / 2;
    let end_y: number = start_y + height;
    let intensity: number = 200;
    if(settings.darkness)
        intensity -= distance;
    if(intensity < 0)
        intensity = 0;

    const color_wall = `rgb(${intensity}, ${intensity}, ${intensity})`;
    const color_line = `rgb(${intensity / 2}, ${intensity / 2}, ${intensity / 2})`;
    ctx.fillStyle = color_wall;
    if(edge_of_wall(ray.x, ray.y))
        ctx.fillStyle = color_line;

    if(is_touch_thin(ray.x, ray.y, '2'))
    {
        if(get_side(ray.x, ray.y, angle) == 1) // south side of the wall
            ctx.fillStyle = `rgb(${intensity}, 0, 0)`;
        else if(get_side(ray.x, ray.y, angle) == 2) // east side of the wall
            ctx.fillStyle = `rgb(0, ${intensity}, 0)`;
        else if(get_side(ray.x, ray.y, angle) == 3) // north side of the wall
            ctx.fillStyle = `rgb(0, 0, ${intensity})`;
        else if(get_side(ray.x, ray.y, angle) == 4) // west side of the wall
            ctx.fillStyle = `rgb(${intensity}, 0, ${intensity})`
        else
            ctx.fillStyle = color_line;
    }

    
    if(draw_player)
    {
        ctx.fillStyle = `rgb(0, 0, ${intensity})`
        start_y = (settings.HEIGHT / 2) - ((settings.HEIGHT / 2) - start_y) / 2;
    }
    

    if(start_y < 0)
        start_y = 0;
    if(end_y > settings.HEIGHT)
        end_y = settings.HEIGHT;

    ctx.fillRect(i, start_y, settings.pixel_size, end_y - start_y);
    
    draw_floor(ctx, i, end_y, settings.HEIGHT, player, old_angle, settings);
    draw_ceiling(ctx, i, start_y, settings.HEIGHT, player, old_angle, settings);
    
    ctx.fillStyle = color_line;
    ctx.fillRect(i, start_y + 1, settings.pixel_size, settings.pixel_size);
    ctx.fillRect(i, end_y - 1, settings.pixel_size, settings.pixel_size);

}

export default draw_one_line;
