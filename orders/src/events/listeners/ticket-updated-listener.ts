import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@sebtickets/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
	queueGroupName = queueGroupName;

	async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
		const ticket = await Ticket.findByEvent(data);

		if (!ticket) {
			throw new Error("Ticket not found");
		}

		//add the version if want to use without the mongoose-update-if-current plugin (see ticket.ts model)
		const { title, price /*version*/ } = data;
		ticket.set({ title, price /*version*/ });
		await ticket.save();

		msg.ack();
	}
}
