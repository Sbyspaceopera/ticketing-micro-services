import { Subjects, Publisher, PaymentCreatedEvent } from "@sebtickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated;
}
