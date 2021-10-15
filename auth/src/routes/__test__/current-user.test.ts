import request from "supertest";
import { app } from "../../app";

it("responds with details about the curent user", async () => {
	const cookie = await global.signin();

	const response = await request(app)
		.get("/api/users/currentuser")
		.set("Cookie", cookie)
		.send()
		.expect(400);

	expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("reponds with null if not authenticate", async () => {
	const response = await request(app)
		.get("/api/users/currentuser")
		.send()
		.expect(200);

	expect(response.body.currentUser).toEqual(null);
});
