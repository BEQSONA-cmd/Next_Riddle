import { useEffect, useRef } from "react";
import { handleKeyDown, handleKeyUp, keys } from "./Keys";
import { player, update_position } from "./Player";
import { draw_map, map, init_map_structure } from "./Map";
import { draw_one_ray, pixel_size, MODE } from "./Draw";
import { IAngle } from "@/utils/types";
import { FOV, WIDTH, HEIGHT } from "./Settings";

const Game = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    init_map_structure();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const gameLoop = () => {
            update_position(player, keys, map);

            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            if (MODE) {
                ctx.fillStyle = player.color;
                ctx.fillRect(player.x, player.y, player.width, player.height);
                draw_map(ctx, map);
            }

            let fracrion: number = FOV / WIDTH;
            fracrion = fracrion * pixel_size;
            let ray_angle: IAngle = { cos_angle: 0, sin_angle: 0, angle: 0 };
            ray_angle.angle = player.angle - FOV / 2;
            
            for (let i = 0; i < WIDTH; i += pixel_size) 
            {
                const screen_offset = (i - WIDTH / 2) / (WIDTH / 2);
            
                const ray_angle_offset = Math.atan(screen_offset * Math.tan(FOV / 2));
                ray_angle.angle = player.angle + ray_angle_offset;
            
                ray_angle.cos_angle = Math.cos(ray_angle.angle);
                ray_angle.sin_angle = Math.sin(ray_angle.angle);
            
                draw_one_ray(ctx, player, ray_angle, i);
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
