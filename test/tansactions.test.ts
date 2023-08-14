import { afterAll, beforeAll, beforeEach, expect, test } from "vitest";
import { execSync } from "node:child_process";
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

//Antes de cada test, esse comando zera o banco de testes e aplica todas as migrations
beforeEach(() => {
	execSync("npm run knex migrate:rollback --all");
	execSync("npm run knex migrate:latest");
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

test("user can list a transaction by id", async () => {
	const createTransactionsResponse = await request(app.server).post("/transactions").send({
		title: "New transaction",
		amount: 5000,
		type: "credit"
	});

	const cookies = createTransactionsResponse.get("Set-Cookie");

	const listTransactionsResponse = await request(app.server).get("/transactions").set("Cookie", cookies).expect(200);

	const transactionsid = listTransactionsResponse.body.transactions[0].id;

	const getTransactionById = await request(app.server)
		.get(`/transactions/${transactionsid}`)
		.set("Cookie", cookies)
		.expect(200);

	//aqui eu defino o que eu espero no corpo da requisição
	expect(getTransactionById.body.transaction).toEqual(
		expect.objectContaining({
			id: expect.any(String),
			title: "New transaction",
			amount: 5000,
			created_at: expect.any(String),
			session_id: expect.any(String)
		})
	);
});

test("user can list a transaction by id", async () => {
	const createTransactionsResponse = await request(app.server).post("/transactions").send({
		title: "New transaction",
		amount: 5000,
		type: "credit"
	});

	const cookies = createTransactionsResponse.get("Set-Cookie");

	await await request(app.server).post("/transactions").set("Cookie", cookies).send({
		title: "New transaction",
		amount: 2000,
		type: "debit"
	});

	const summaryResponse = await request(app.server).get("/transactions/summary").set("Cookie", cookies).expect(200);

	expect(summaryResponse.body.summary).toEqual(expect.objectContaining({ Amount: 3000 }));
});
