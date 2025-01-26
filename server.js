const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

const lobbies = {}; // Store lobbies and their players

server.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "join_lobby") {
            const { lobby, player } = data;

            // Add player to the lobby
            if (!lobbies[lobby]) {
                lobbies[lobby] = [];
            }
            lobbies[lobby].push({ ws, player });

            // Notify existing players about the new player
            lobbies[lobby].forEach(({ ws: client }) => {
                if (client !== ws) {
                    client.send(JSON.stringify({ type: "player_joined", player }));
                }
            });

            console.log(`Player ${player.id} joined lobby ${lobby}`);
        }

        if (data.type === "update_position") {
            const { lobby, player } = data;

            // Broadcast the player's position to everyone in the lobby
            lobbies[lobby].forEach(({ ws: client }) => {
                if (client !== ws) {
                    client.send(JSON.stringify({ type: "update_position", player }));
                }
            });
        }
    });

    ws.on("close", () => {
        // Remove disconnected players from all lobbies
        for (const lobby in lobbies) {
            lobbies[lobby] = lobbies[lobby].filter(({ ws: client }) => client !== ws);
        }
    });
});

console.log("WebSocket server running on ws://localhost:8080");
