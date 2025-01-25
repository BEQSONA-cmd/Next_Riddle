import { player } from './Player';

const map1 = [
    "1111111111111111",
    "1000000000000001",
    "1000000000000001",
    "100001111S100001",
    "1000010000100001",
    "1000010000100001",
    "1000010000100001",
    "1000010000100001",
    "100001N111100001",
    "1000000000000001",
    "1000000000000001",
    "1111111111111111",
];

const map = [
    "11111111111111111111111",
    "10000000100000100000001",
    "1000S000100000100010001",
    "10010100100000100000001",
    "10000000100000100010001",
    "100000P0100000100000001",
    "11111111100000111111111",
    "10000000100000100000001",
    "10000000100000100010001",
    "10010100100000100000001",
    "1000N000100000100010001",
    "10000000100000100000001",
    "11111111111111111111111",
];

const map_structure = {
    south: false,
    north: false,
    west: false,
    east: false,
    sout_x: 0,
    sout_y: 0,
    north_x: 0,
    north_y: 0,
    west_x: 0,
    west_y: 0,
    east_x: 0,
    east_y: 0,
}

function init_map_structure(map: any) 
{
    let x: number = 0;
    let y: number = 0;

    while(map[y])
    {
        while(map[y][x])
        {
            if(map[y][x] === 'N')
            {
                map_structure.north_x = x * block_size;
                map_structure.north_y = y * block_size;
                map_structure.north = true;
            }
            else if(map[y][x] === 'S')
            {
                map_structure.sout_x = x * block_size;
                map_structure.sout_y = y * block_size + block_size;
                map_structure.south = true;
            }
            else if(map[y][x] === 'W')
            {
                map_structure.west_x = x * block_size;
                map_structure.west_y = y * block_size;
                map_structure.west = true;
            }
            else if(map[y][x] === 'E')
            {
                map_structure.east_x = x * block_size + block_size;
                map_structure.east_y = y * block_size;
                map_structure.east = true;
            }
            else if(map[y][x] === 'P')
            {
                player.x = x * block_size;
                player.y = y * block_size;
            }
            x++;
        }
        x = 0;
        y++;
    }
}


const SOUTH = 'S';
const NORTH = 'N';
const WEST = 'W';
const EAST = 'E';

const block_size: number = 50;

function draw_map(ctx: any, map: any) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) 
        {
            if (map[i][j] === "1") 
            {
                ctx.fillStyle = "blue";
                ctx.fillRect(j * block_size, i * block_size, block_size, block_size);
            }
        }
    }
}
  
export { draw_map, map, block_size, map_structure, init_map_structure };
