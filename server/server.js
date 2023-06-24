import http from "node:http";
import app from "./app";
import config from "./utils/config";
import logger from "./utils/logger";

const server = http.createServer(app);

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	logger.info("Listening on: %s", bind);
});

server.listen(config.port, () => {
	logger.info(`Server is running on http://localhost:${config.port}`);
});
