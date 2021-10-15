import { Publisher, Subjects, TicketUpdatedEvent } from "@sebtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated;
}
