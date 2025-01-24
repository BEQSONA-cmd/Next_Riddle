import { is_touch } from "./Draw";
import { map_structure, block_size } from "./Map";
import { get_no, get_so, get_we, get_ea, pixel_size } from "./Draw";
import { IPlayer } from "@/utils/types";
const WIDTH = 800;
const HEIGHT = 600;



const player:IPlayer = {
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

function check_portal(player: IPlayer, dx: number, dy: number)
{
    if (is_touch(player.x + dx, player.y + dy, 'S'))
    {
        if(map_structure.north)
        {
            [player.x, player.y] = get_no(player.x, map_structure.sout_x);
            player.y -= pixel_size;
        }
        else if(map_structure.west)
        {
            let diff_x = player.x - map_structure.sout_x;
            player.y = map_structure.west_y - diff_x + block_size;
            player.x = map_structure.west_x - pixel_size;
            player.angle = player.angle - Math.PI / 2;
        }
        else if(map_structure.east)
        {
            [player.x, player.y] = get_ea(player.x, map_structure.sout_x);
            player.angle = player.angle + Math.PI / 2;
        }
    }
    else if (is_touch(player.x + dx, player.y + dy, 'N'))
    {
        if(map_structure.south)
        {
            [player.x, player.y] = get_so(player.x, map_structure.north_x);
        }
        else if(map_structure.west)
        {
            [player.x, player.y] = get_we(player.x, map_structure.north_x);
            player.x = player.x - pixel_size;
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
    else if (is_touch(player.x + dx, player.y + dy, 'W'))
    {
        if(map_structure.east)
        {
            [player.x, player.y] = get_ea(player.y, map_structure.west_y);
        }
        else if(map_structure.north)
        {
            [player.x, player.y] = get_no(player.y, map_structure.west_y);
            player.y = player.y - pixel_size;
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
    else if (is_touch(player.x + dx, player.y + dy, 'E'))
    {
        if(map_structure.west)
        {
            [player.x, player.y] = get_we(player.y, map_structure.east_y);
            player.x = player.x - pixel_size;
        }
        else if(map_structure.north)
        {
            let diff_x = player.y - map_structure.east_y;
            player.x = map_structure.north_x - diff_x + block_size;
            player.y = map_structure.north_y - pixel_size;
            player.angle = player.angle + Math.PI / 2;
        }
        else if(map_structure.south)
        {
            [player.x, player.y] = get_so(player.y, map_structure.east_y);
            player.angle = player.angle - Math.PI / 2;
        }
    }
}


function update_position(player: any, keys: any, map: any) 
{
    const angle_speed: number = 0.1;

    if (keys["ArrowLeft"])
        player.angle -= angle_speed;
    else if (keys["ArrowRight"])
        player.angle += angle_speed;

    const cos_angle = Math.cos(player.angle);
    const sin_angle = Math.sin(player.angle);

    let dx = 0;
    let dy = 0;

    if (keys["w"]) 
    {
        dx += cos_angle * player.speed;
        dy += sin_angle * player.speed;
    } 
    else if (keys["s"]) 
    {
        dx -= cos_angle * player.speed;
        dy -= sin_angle * player.speed;
    }

    if (keys["a"]) 
    {
        dx += sin_angle * player.speed;
        dy -= cos_angle * player.speed;
    } 
    else if (keys["d"]) 
    {
        dx -= sin_angle * player.speed;
        dy += cos_angle * player.speed;
    }

    player.x += dx;
    if(is_touch(player.x, player.y, '1'))
        player.x -= dx;
    player.y += dy;
    if(is_touch(player.x, player.y, '1'))
        player.y -= dy;

    check_portal(player, dx, dy);

}

export {player, WIDTH, HEIGHT, update_position };
