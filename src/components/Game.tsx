import { useEffect, useRef } from "react";
import { handleKeyDown, handleKeyUp, keys } from "./Keys";
import { update_position, player, WIDTH, HEIGHT } from "./Player";
import { draw_map, map , block_size} from "./Map";
import { is_not_wall, fixed_dist } from "./Utils";

const pixel_size: number = 4;
const MODE: number = 0;

function draw_one_ray(ctx: any, player: any, start_x: number, i: number)
{
  let ray_x: number = player.x;
  let ray_y: number = player.y;

  const cos_angle: number = Math.cos(start_x);
  const sin_angle: number = Math.sin(start_x);

  while(is_not_wall(ray_x, ray_y))
  {
    if(MODE)
    {
      ctx.fillStyle = "red";
      ctx.fillRect(ray_x, ray_y, pixel_size, pixel_size);
    }

    ray_x += cos_angle;
    ray_y += sin_angle;
  }

  if(!MODE)
  {
    const distance: number = fixed_dist(player.x, player.y, ray_x, ray_y, player);
    const height: number = (block_size / distance) * (WIDTH / 2);
    let start_y = (HEIGHT - height) / 2;
    let end_y = start_y + height;

    if(start_y < 0)
      start_y = 0;
    if(end_y > HEIGHT)
      end_y = HEIGHT;

    while(start_y < end_y)
    {
      ctx.fillStyle = "red";
      ctx.fillRect(i, start_y, pixel_size, pixel_size);
      start_y += pixel_size;
    }
  }
}

const Game = () => 
{
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => 
  {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gameLoop = () => 
    {
      update_position(player, keys, map);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      if(MODE)
      {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.width, player.height);
        draw_map(ctx, map);
      }

      let fracrion: number = Math.PI / 3 / WIDTH;
      fracrion = fracrion * pixel_size;
      let start_x: number = player.angle - Math.PI / 6;

      for (let i = 0; i < WIDTH; i += pixel_size)
      {
        draw_one_ray(ctx, player, start_x, i);
        start_x += fracrion;
      }

      requestAnimationFrame(gameLoop);
    };

    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    gameLoop();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);


    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <canvas ref={canvasRef} className="border-2 border-gray-700"></canvas>
    </div>
  );
};

export default Game;
