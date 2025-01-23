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

const SOUTH = 'S';
const WEST = 'W';
const EAST = 'E';
const NORTH = 'N';

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
  
export { draw_map, map, block_size };
