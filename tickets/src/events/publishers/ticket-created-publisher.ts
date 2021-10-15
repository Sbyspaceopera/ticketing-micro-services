import { Publisher, Subjects, TicketCreatedEvent } from "@sebtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated;
}
