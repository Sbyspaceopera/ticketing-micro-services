import { Publisher, OrderCancelledEvent, Subjects } from "@sebtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled;
}
