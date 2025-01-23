import { useEffect, useRef } from "react";
import { handleKeyDown, handleKeyUp, keys } from "./Keys";
import { update_position, player, WIDTH, HEIGHT } from "./Player";
import { draw_map, map, init_map_structure } from "./Map";
import { draw_one_ray, pixel_size, MODE } from "./Draw";

// pi / 2 = 90 degrees
// pi = 180 degrees
// pi * 3 / 2 = 270 degrees
// pi * 2 = 360 degrees

const Game = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    init_map_structure(map);

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

            let fracrion: number = Math.PI / 3 / WIDTH;
            fracrion = fracrion * pixel_size;
            let start_x: number = player.angle - Math.PI / 6;

            for (let i = 0; i < WIDTH; i += pixel_size) {
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
