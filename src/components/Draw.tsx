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

function draw_one_ray(ctx: any, player: any, ray_angle_first: number, i: number) {
    let ray_x: number = player.x;
    let ray_y: number = player.y;
    let ray_angle: number = player.angle

    let cos_angle: number = Math.cos(ray_angle);
    let sin_angle: number = Math.sin(ray_angle);

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

    let distance: number = fixed_dist(player.x, player.y, ray_x, ray_y);
    let add_distance: number = 0;
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
            cos_angle = Math.cos(ray_angle - Math.PI / 2);
            sin_angle = Math.sin(ray_angle - Math.PI / 2);
        }
        else if(map_structure.east)
        {
            [no_ray_x, no_ray_y] = get_ea(ray_x, map_structure.sout_x);
            cos_angle = Math.cos(ray_angle + Math.PI / 2);
            sin_angle = Math.sin(ray_angle + Math.PI / 2);
        }
        
        ray_x = no_ray_x + cos_angle;
        ray_y = no_ray_y + sin_angle;
        const save_x = ray_x;
        const save_y = ray_y;

        while(!is_touch(ray_x, ray_y, '1'))
        {
            if(MODE)
            {
                ctx.fillStyle = "red";
                ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);
            }

            ray_x += cos_angle;
            ray_y += sin_angle;
        }
        add_distance = fixed_dist(save_x, save_y, ray_x, ray_y);
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
            cos_angle = Math.cos(ray_angle + Math.PI / 2);
            sin_angle = Math.sin(ray_angle + Math.PI / 2);
        }
        else if(map_structure.east)
        {
            let diff_x = ray_x - map_structure.north_x;
            so_ray_y = map_structure.east_y - diff_x + block_size;
            so_ray_x = map_structure.east_x;
            cos_angle = Math.cos(ray_angle - Math.PI / 2);
            sin_angle = Math.sin(ray_angle - Math.PI / 2);
        }
            
        ray_x = so_ray_x + cos_angle;
        ray_y = so_ray_y + sin_angle;
        const save_x = ray_x;
        const save_y = ray_y;

        while(!is_touch(ray_x, ray_y, '1'))
        {
            if(MODE)
            {
                ctx.fillStyle = "red";
                ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);
            }

            ray_x += cos_angle;
            ray_y += sin_angle;
        }
        add_distance = fixed_dist(save_x, save_y, ray_x, ray_y);
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
            cos_angle = Math.cos(ray_angle - Math.PI / 2);
            sin_angle = Math.sin(ray_angle - Math.PI / 2);
        }
        else if(map_structure.south)
        {
            let diff_x = ray_y - map_structure.west_y;
            ea_ray_y = map_structure.sout_y;
            ea_ray_x = map_structure.sout_x - diff_x + block_size;
            cos_angle = Math.cos(ray_angle + Math.PI / 2);
            sin_angle = Math.sin(ray_angle + Math.PI / 2);
        }
            
        ray_x = ea_ray_x + cos_angle;
        ray_y = ea_ray_y + sin_angle;
        const save_x = ray_x;
        const save_y = ray_y;

        while(!is_touch(ray_x, ray_y, '1'))
        {
            if(MODE)
            {
                ctx.fillStyle = "red";
                ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);
            }

            ray_x += cos_angle;
            ray_y += sin_angle;
        }
        add_distance = fixed_dist(save_x, save_y, ray_x, ray_y);
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
            cos_angle = Math.cos(ray_angle + Math.PI / 2);
            sin_angle = Math.sin(ray_angle + Math.PI / 2);
        }
        else if(map_structure.south)
        {
            [we_ray_x, we_ray_y] = get_so(ray_y, map_structure.east_y);
            cos_angle = Math.cos(ray_angle - Math.PI / 2);
            sin_angle = Math.sin(ray_angle - Math.PI / 2);
        }
            
        ray_x = we_ray_x + cos_angle;
        ray_y = we_ray_y + sin_angle;
        const save_x = ray_x;
        const save_y = ray_y;

        while(!is_touch(ray_x, ray_y, '1'))
        {
            if(MODE)
            {
                ctx.fillStyle = "red";
                ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);
            }

            ray_x += cos_angle;
            ray_y += sin_angle;
        }
        add_distance = fixed_dist(save_x, save_y, ray_x, ray_y);
    }

    if(!MODE)
    {
        distance += add_distance;
        distance *= Math.cos(ray_angle - player.angle);


      const height: number = ((block_size / distance) * (WIDTH / 2)) * 1.3;
      let start_y = (HEIGHT - height) / 2;
      let end_y = start_y + height;
      const intensity = Math.max(0, 255 - distance);
    
      let angle: number = ray_angle;
    
    //   ctx.fillStyle = "blue";
      if(get_side(ray_x, ray_y, ray_angle) == 1)
        ctx.fillStyle = `rgb(${intensity}, 0, 0)`;
      else if(get_side(ray_x, ray_y, ray_angle) == 2)
        ctx.fillStyle = `rgb(0, ${intensity}, 0)`;
      else if(get_side(ray_x, ray_y, ray_angle) == 3)
        ctx.fillStyle = `rgb(0, 0, ${intensity})`;
      else if(get_side(ray_x, ray_y, ray_angle) == 4)
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
    if (is_touch(player.x, player.y, '1'))
        player.x -= dx;
    else if (is_touch(player.x, player.y, 'S'))
    {
        if(map_structure.north)
        {
            [player.x, player.y] = get_no(player.x, map_structure.sout_x);
        }
        else if(map_structure.west)
        {
            let diff_x = player.x - map_structure.sout_x;
            player.y = map_structure.west_y - diff_x + block_size;
            player.x = map_structure.west_x;
            player.angle = player.angle - Math.PI / 2;
        }
        else if(map_structure.east)
        {
            [player.x, player.y] = get_ea(player.x, map_structure.sout_x);
            player.angle = player.angle + Math.PI / 2;
        }
    }
    else if (is_touch(player.x, player.y, 'N'))
    {
        if(map_structure.south)
        {
            [player.x, player.y] = get_so(player.x, map_structure.north_x);
        }
        else if(map_structure.west)
        {
            [player.x, player.y] = get_we(player.x, map_structure.north_x);
            player.angle = player.angle + Math.PI / 2;
        }
        else if(map_structure.east)
        {
            let diff_x = player.x - map_structure.north_x;
            player.y = map_structure.east_y - diff_x + block_size;
            player.x = map_structure.east_x;
            player.angle = player.angle - Math.PI / 2;
        }
    }
    else if (is_touch(player.x, player.y, 'W'))
    {
        if(map_structure.east)
        {
            [player.x, player.y] = get_ea(player.y, map_structure.west_y);
        }
        else if(map_structure.north)
        {
            [player.x, player.y] = get_no(player.y, map_structure.west_y);
            player.angle = player.angle - Math.PI / 2;
        }
        else if(map_structure.south)
        {
            let diff_x = player.y - map_structure.west_y;
            player.x = map_structure.sout_x - diff_x + block_size;
            player.y = map_structure.sout_y;
            player.angle = player.angle + Math.PI / 2;
        }
    }
    else if (is_touch(player.x, player.y, 'E'))
    {
        if(map_structure.west)
        {
            [player.x, player.y] = get_we(player.y, map_structure.east_y);
        }
        else if(map_structure.north)
        {
            let diff_x = player.y - map_structure.east_y;
            player.x = map_structure.north_x - diff_x + block_size;
            player.y = map_structure.north_y;
            player.angle = player.angle + Math.PI / 2;
        }
        else if(map_structure.south)
        {
            [player.x, player.y] = get_so(player.y, map_structure.east_y);
            player.angle = player.angle - Math.PI / 2;
        }
    }

    player.y += dy;
    if (is_touch(player.x, player.y, '1'))
        player.y -= dy;
    else if (is_touch(player.x, player.y, 'S'))
    {
        if(map_structure.north)
        {
            [player.x, player.y] = get_no(player.x, map_structure.sout_x);
        }
        else if(map_structure.west)
        {
            let diff_x = player.x - map_structure.sout_x;
            player.y = map_structure.west_y - diff_x + block_size;
            player.x = map_structure.west_x;
            player.angle = player.angle - Math.PI / 2;
        }
        else if(map_structure.east)
        {
            [player.x, player.y] = get_ea(player.x, map_structure.sout_x);
            player.angle = player.angle + Math.PI / 2;
        }
    }
    else if (is_touch(player.x, player.y, 'N'))
    {
        if(map_structure.south)
        {
            [player.x, player.y] = get_so(player.x, map_structure.north_x);
        }
        else if(map_structure.west)
        {
            [player.x, player.y] = get_we(player.x, map_structure.north_x);
            player.angle = player.angle + Math.PI / 2;
        }
        else if(map_structure.east)
        {
            let diff_x = player.x - map_structure.north_x;
            player.y = map_structure.east_y - diff_x + block_size;
            player.x = map_structure.east_x;
            player.angle = player.angle - Math.PI / 2;
        }
    }
    else if (is_touch(player.x, player.y, 'W'))
    {
        if(map_structure.east)
        {
            [player.x, player.y] = get_ea(player.y, map_structure.west_y);
        }
        else if(map_structure.north)
        {
            [player.x, player.y] = get_no(player.y, map_structure.west_y);
            player.angle = player.angle - Math.PI / 2;
        }
        else if(map_structure.south)
        {
            let diff_x = player.y - map_structure.west_y;
            player.x = map_structure.sout_x - diff_x + block_size;
            player.y = map_structure.sout_y;
            player.angle = player.angle + Math.PI / 2;
        }
    }
    else if (is_touch(player.x, player.y, 'E'))
    {
        if(map_structure.west)
        {
            [player.x, player.y] = get_we(player.y, map_structure.east_y);
        }
        else if(map_structure.north)
        {
            let diff_x = player.y - map_structure.east_y;
            player.x = map_structure.north_x - diff_x + block_size;
            player.y = map_structure.north_y;
            player.angle = player.angle + Math.PI / 2;
        }
        else if(map_structure.south)
        {
            [player.x, player.y] = get_so(player.y, map_structure.east_y);
            player.angle = player.angle - Math.PI / 2;
        }
    }

    player.dx = dx;
    player.dy = dy;
}

export { draw_one_ray, pixel_size, MODE, is_touch, update_position };
