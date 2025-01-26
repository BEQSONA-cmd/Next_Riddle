import { block_size, map } from './Map';
import { IAngle } from "@/utils/types";
import { player } from './Player';

function is_touch_thin(px: number, py: number, c: any) 
{
    const block_x: number = px / block_size;
    const block_y: number = py / block_size;
    const thickness = block_size / 8;

    const map_x = Math.floor(block_x);
    const map_y = Math.floor(block_y);

    if (map_y < 0 || map_y >= map.length || map_x < 0 || map_x >= map[0].length) {
        return 1;
    }

    if (map[map_y][map_x] === c)
    {
        if(c === 'S')
        {
            let x_in_map = map_x * block_size;
            let y_in_map = map_y * block_size + (block_size - thickness);
    
            if (px >= x_in_map - 20 && px <= x_in_map + block_size + 20 && py >= y_in_map && py <= y_in_map + thickness)
                return 1;
        }
        else if(c === 'N')
        {
            let x_in_map = map_x * block_size;
            let y_in_map = map_y * block_size;
    
            if (px >= x_in_map && px <= x_in_map + block_size && py >= y_in_map && py <= y_in_map + thickness)
                return 1;
        }
        else if(c === 'W')
        {
            let x_in_map = map_x * block_size;
            let y_in_map = map_y * block_size;
    
            if (px >= x_in_map && px <= x_in_map + thickness && py >= y_in_map && py <= y_in_map + block_size)
                return 1;
        }
        else if(c === 'E')
        {
            let x_in_map = map_x * block_size + (block_size - thickness);
            let y_in_map = map_y * block_size;
    
            if (px >= x_in_map && px <= x_in_map + thickness && py >= y_in_map && py <= y_in_map + block_size)
                return 1;
        }
        else
            return 1;
    }
    
    return 0;
}

function touch_any(x: number, y: number)
{
    const block_x: number = x / block_size;
    const block_y: number = y / block_size;

    const map_x = Math.floor(block_x);
    const map_y = Math.floor(block_y);

    if (map_y < 0 || map_y >= map.length || map_x < 0 || map_x >= map[0].length) {
        return 1;
    }

    if (map[map_y][map_x] !== '0' && map[map_y][map_x] !== 'P')
        return 1;
    return 0;
}

function get_side(ray_x: number, ray_y: number, angle: IAngle): number 
{
    let sx: number = 0;
    let sy: number = 0;
    
    if (angle.cos_angle > 0) 
        sx = 1;
    if (angle.sin_angle > 0) 
        sy = 1;
    if (angle.cos_angle < 0) 
        sx = -1;
    if (angle.sin_angle < 0)
        sy = -1;

    if (touch_any(ray_x - sx, ray_y) && !touch_any(ray_x, ray_y - sy)) 
    {
        if (sy == 1) 
            return 3;
        else if(sy == -1) 
            return 1;
        
    }
    if (touch_any(ray_x, ray_y - sy) && !touch_any(ray_x - sx, ray_y))
    {
        if (sx == 1) 
            return 4;
        else if(sx == -1) 
            return 2;
    }

    return 0;
}

function is_touch_player(x: number, y: number)
{
    const px = player.x;
    const py = player.y;
    const psize = 20;

    if (x >= px && x <= px + psize && y >= py && y <= py + psize)
        return 1;

    return 0;
}

function is_touch_side(x: number, y: number, angle: IAngle, portalnum: number)
{
    if (is_touch_thin(x, y, '1'))
        return 1;
    else if (is_touch_thin(x, y, 'S') && get_side(x, y, angle) == 1)
        return 1;
    else if (is_touch_thin(x, y, 'N') && get_side(x, y, angle) == 3)
        return 1;
    else if (is_touch_thin(x, y, 'W') && get_side(x, y, angle) == 4)
        return 1;
    else if (is_touch_thin(x, y, 'E') && get_side(x, y, angle) == 2)
        return 1;
    else if (is_touch_player(x, y) && portalnum > 0)
        return 2;

    return 0;
}

export { is_touch_thin, touch_any, get_side, is_touch_side, is_touch_player };