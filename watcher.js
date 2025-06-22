const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");
const http = require("http");

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
	console.log("🔌 Browser connected to WebSocket");
});

// Fungsi rekursif pantau semua file .php dan .js
function watchAllFiles(dir) {
	fs.readdirSync(dir).forEach((file) => {
		const fullPath = path.join(dir, file);
		const stat = fs.statSync(fullPath);

		if (stat.isDirectory()) {
			watchAllFiles(fullPath); // rekursif ke subfolder
		} else if (file.endsWith(".php") || file.endsWith(".js")) {
			try {
				fs.watch(fullPath, (eventType) => {
					console.log(`🔁 File changed: ${fullPath}`);
					wss.clients.forEach((client) => {
						if (client.readyState === WebSocket.OPEN) {
							client.send("reload-frame");
						}
					});
				});
			} catch (err) {
				console.error("❌ Error watching:", fullPath, err);
			}
		}
	});
}

// Mulai memantau dari folder project
watchAllFiles(__dirname);

server.listen(3001, () => {
	console.log("🌐 WebSocket running on ws://localhost:3001");
});
