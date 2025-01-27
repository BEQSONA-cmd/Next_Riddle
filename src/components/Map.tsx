const map_recursive = [
    "11111111111111111",
    "10000000000000001",
    "10000111111100001",
    "10000E00000100001",
    "10000100000100000",
    "10000100000W00001",
    "10000111111100001",
    "10000000000000001",
    "11111111111111111",
];

const map0 = [
    "111111S1111111111",
    "10000000000000001",
    "10000000000000001",
    "10000000010000001",
    "1000000000000000W",
    "10000000000000001",
    "10000000000000001",
    "10000000000000001",
    "11111111111111111",
];

const map1 = [
    "11111111111111111",
    "10000000110000011",
    "10000000100000001",
    "1000S000100000001",
    "10010100100101001",
    "100000001000N0001",
    "10000000100000001",
    "11000000100000001",
    "11111111111111111",
];

const map2 = [
    "11111111111111111",
    "11000001110000011",
    "10000000100000001",
    "10001000100000001",
    "10000W00100101001",
    "100010001000N0001",
    "10000000100000001",
    "11000000100000001",
    "11111111111111111",
];

const map3 = [
    "11111111111111111",
    "11000001110000011",
    "10000000100000001",
    "10001000100010001",
    "10000W00100E00001",
    "10001000100010001",
    "10000000100000001",
    "11000000110000011",
    "11111111111111111",
];

const map4 = [
    "11111111111111111",
    "10000000110000011",
    "10000000100000001",
    "1000S000100010001",
    "10010100100E00001",
    "10000000100010001",
    "10000000100000001",
    "11000000110000011",
    "11111111111111111",
];


const map_list = [map1, map2, map3, map4];

let map = map0;

function change_map(new_map: any) 
{
    map = new_map;
    init_map_structure();
}

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

function init_map_structure() 
{
    let x: number = 0;
    let y: number = 0;
    map_structure.south = false;
    map_structure.north = false;
    map_structure.west = false;
    map_structure.east = false;

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
  
export { draw_map, map, block_size, map_structure, init_map_structure, map_list, change_map };
