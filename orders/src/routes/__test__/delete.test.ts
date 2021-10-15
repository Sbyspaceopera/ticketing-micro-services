import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";
import mongoose from "mongoose";

it("marks an order as cancelled", async () => {
	// Create a ticket with ticket model
	const ticket = Ticket.build({
		title: "concert",
		price: 20,
		id: new mongoose.Types.ObjectId().toHexString(),
	});
	await ticket.save();

	const user = global.signin();
	//make a request to create an order
	const { body: order } = await request(app)
		.post("/api/orders")
		.set("Cookie", user)
		.send({ ticketId: ticket.id })
		.expect(201);

	//make a request to cancel the order
	await request(app)
		.delete(`/api/orders/${order.id}`)
		.set("Cookie", user)
		.send()
		.expect(204);

	//expectaiton to make sure the thing is cancelled
	const updatedOrder = await Order.findById(order.id);

	expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("emits a order cancelled event", async () => {
	// Create a ticket with ticket model
	const ticket = Ticket.build({
		title: "concert",
		price: 20,
		id: new mongoose.Types.ObjectId().toHexString(),
	});
	await ticket.save();

	const user = global.signin();
	//make a request to create an order
	const { body: order } = await request(app)
		.post("/api/orders")
		.set("Cookie", user)
		.send({ ticketId: ticket.id })
		.expect(201);

	//make a request to cancel the order
	await request(app)
		.delete(`/api/orders/${order.id}`)
		.set("Cookie", user)
		.send()
		.expect(204);

	//Look if two events has been published (through the function calls)
	// The first for the order created in this test
	// and the second for the actual order cancelled
	expect(natsWrapper.client.publish).toHaveBeenCalledTimes(2);
});
