//This has been splitted from the app for testing purpose :
// dont using the real database but a fake one "in-cache memory" in jest (mongodb memory server)

import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error("JWT_KEY must be defined!");
	}

	if (!process.env.MONGO_URI) {
		throw new Error("MONGO_URI must be defined!");
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Connected to MongoDB");
	} catch (err) {
		console.error(err);
	}

	app.listen(3000, () => {
		console.log("Listening on port 3000");
	});
};
start();
