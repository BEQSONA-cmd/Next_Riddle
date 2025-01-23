const map = [
    "1111111S11111111",
    "1000000000000001",
    "1000000000000001",
    "1000000000000001",
    "1000000000000001",
    "1000000000000001",
    "1000000000000001",
    "1000000000000001",
    "1000000000000001",
    "1000000000000001",
    "1000000000000001",
    "111111111111N111",
];

const map_structure = {
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
            }
            else if(map[y][x] === 'S')
            {
                map_structure.sout_x = x * block_size;
                map_structure.sout_y = y * block_size;
            }
            else if(map[y][x] === 'W')
            {
                map_structure.west_x = x * block_size;
                map_structure.west_y = y * block_size;
            }
            else if(map[y][x] === 'E')
            {
                map_structure.east_x = x * block_size;
                map_structure.east_y = y * block_size;
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
            if (map[i][j] === NORTH)
            {
                ctx.fillStyle = "green";
                ctx.fillRect(j * block_size, i * block_size, block_size, block_size);
            }
            if (map[i][j] === SOUTH)
            {
                ctx.fillStyle = "yellow";
                ctx.fillRect(j * block_size, i * block_size, block_size, block_size);
            }
        }
    }
}
  
export { draw_map, map, block_size, map_structure, init_map_structure };
