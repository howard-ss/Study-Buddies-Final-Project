import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";


import App from "./App";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
// const http = require("http");
// const app = require("./App");
// const { connectDb, disconnectDb } = require("./db");
// const config = require("./utils/config");
// const logger = require("./utils/logger");

// const server = http.createServer(app);

// server.on("listening", () => {
// 	const addr = server.address();
// 	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
// 	logger.info("Listening on: %s", bind);
// });

// process.on("SIGTERM", () => server.close(() => disconnectDb()));

// connectDb().then(() => server.listen(config.port));
