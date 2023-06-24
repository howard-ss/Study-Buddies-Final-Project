import "dotenv/config";

export default {
	dbUrl: createDatabaseUrl(),
	logLevel: process.env.LOG_LEVEL ?? "info",
	port: parseInt(process.env.PORT ?? "3000", 10),
	production: process.env.NODE_ENV === "production",
};

function createDatabaseUrl() {
	if (process.env.DATABASE_URL) {
		return process.env.DATABASE_URL;
	}
	const host = process.env.DB_HOST ?? "dpg-ci9fhi59aq02ihskfakg-a.oregon-postgres.render.com";
	const name = process.env.DB_NAME ?? "studybuddy_vz9u";
	const password =process.env.DB_PASS ?? "RQ5xO4YsfA1YfH2lpSYFl4ESUlkq2x3W";
	const port = process.env.DB_PORT ?? "5432";
	const username = process.env.DB_USER ?? "regional";
	const userinfo = `${username}:${password}`;
	return `postgres://${
		userinfo !== ":" ? `${userinfo}@` : ""
	}${host}:${port}/${name}`;
}
