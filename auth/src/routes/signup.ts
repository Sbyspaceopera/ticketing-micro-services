import express, { Request, Response } from "express";
const { body } = require("express-validator");
import jwt from "jsonwebtoken";

import { validateRequest, BadRequestError } from "@sebtickets/common";
import { User } from "../models/user";

const router = express.Router();

router.post(
	"/api/users/signup",
	[
		body("email").isEmail().withMessage("Email must be valid"),
		body("password")
			.trim()
			.isLength({ min: 6, max: 20 })
			.withMessage("Password must be between 6 and 20 characters"),
	],
	validateRequest,

	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			//console.log("Email in use");
			//return res.send({});
			throw new BadRequestError("Already an user with this mail");
		}

		const user = User.build({ email, password });

		await user.save();

		//Generate JWT
		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.JWT_KEY!
		);

		//Store it on session object
		req.session = {
			jwt: userJwt,
		};

		res.status(201).send(user);
	}
);

export { router as signupRouter };
