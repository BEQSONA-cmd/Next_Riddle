const map = [
    "1111111111111111",
    "1000000000000001",
    "1000010000000001",
    "1000000000000001",
    "1000000000000001",
    "1000000001000001",
    "1000000000000001",
    "1000000100000001",
    "1000000000000001",
    "1000000000010001",
    "1000000000000001",
    "1111111111111111",
];
  
const block_size: number = 50;

function draw_map(ctx: any, map: any) {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === "1") 
            {
                ctx.fillStyle = "blue";
                ctx.fillRect(j * block_size, i * block_size, block_size, block_size);
            }
        }
    }
}
  
export { draw_map, map, block_size };
