import {
	Subjects,
	Publisher,
	ExpirationCompleteEvent,
} from "@sebtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
	readonly subject = Subjects.ExpirationComplete;
}
