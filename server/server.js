import http from "node:http";
import app from "./app";
import config from "./utils/config";
import logger from "./utils/logger";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: "your-postgres-connection-string",
});

pool.on("connect", () => {
	logger.info("Connected to the database");
});

pool.on("error", (err) => {
	logger.error("Database connection error:", err);
});

// Pass the database pool to the app
app.set("pool", pool);

const server = http.createServer(app);

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	logger.info("Listening on: %s", bind);
});

server.listen(config.port, () => {
	logger.info(`Server is running on http://localhost:${config.port}`);
});
