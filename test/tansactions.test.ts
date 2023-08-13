import { afterAll, beforeAll, expect, test } from "vitest";
import request from "supertest";
import { app } from "../src/app";

beforeAll(async () => {
	await app.ready();
});

afterAll(async () => {
	await app.close();
});

test("user can create a new transaction", async () => {
	await request(app.server)
		.post("/transactions")
		.send({
			title: "New transaction",
			amount: 5000,
			type: "credit"
		})
		.expect(201);
});

//Como foi implementado o sistema de cookies e sem ele não é possivel acessar nenhum conteúdo, é necessário no teste criar uma transação antes de tentar listar
test("user can list your transactions", async () => {
	const createTransactionsResponse = await request(app.server).post("/transactions").send({
		title: "New transaction",
		amount: 5000,
		type: "credit"
	});

	const cookies = createTransactionsResponse.get("Set-Cookie");

	const listTransactionsResponse = await request(app.server).get("/transactions").set("Cookie", cookies).expect(200);

	//aqui eu defino o que eu espero no corpo da requisição
	expect(listTransactionsResponse.body.transactions).toEqual([
		expect.objectContaining({
			id: expect.any(String)
		})
	]);
});
