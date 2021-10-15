import { Publisher, OrderCreatedEvent, Subjects } from "@sebtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated;
}
