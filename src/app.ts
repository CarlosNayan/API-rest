import fastify from "fastify";
import cookie from "@fastify/cookie";

import { transactionsRoutes } from "./routes/transactions";

export const app = fastify();

// Register puxa as rotas programadas em outro lugar. A ordem dessa importação é importante!
app.register(cookie);

// Hook de rota para log de informações
app.addHook("onRequest", (request, reply, done) => {
	const { method, url } = request;
	console.log(`[${method}] ${url}`);
	done();
});

app.register(transactionsRoutes, {
	prefix: "transactions"
});
