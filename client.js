let ws;

function setupWebSocket() {
	try {
		ws = new WebSocket("ws://localhost:3001");

		ws.onopen = () => {
			console.log("✅ Connected to WebSocket reload server");
		};

		ws.onmessage = (event) => {
			if (event.data === "reload-frame") {
				console.log("🔃 Reload triggered by server");
				parent.frames["right"].location.href =
					parent.frames["right"].location.href;
			}
		};

		ws.onerror = (err) => {
			console.warn("⚠️ WebSocket error:", err);
		};

		ws.onclose = () => {
			console.warn("🔌 WebSocket closed. Reconnecting in 1 second...");
			setTimeout(setupWebSocket, 1000); // reconnect setiap 1 detik
		};
	} catch (e) {
		console.error("❌ WebSocket init failed:", e);
		setTimeout(setupWebSocket, 1000);
	}
}

setupWebSocket();
