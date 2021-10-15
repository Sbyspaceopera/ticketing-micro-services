import Link from "next/link";
const Index = ({ currentUser, tickets }) => {
	const ticketList = tickets.map((ticket) => {
		return (
			<tr key={ticket.id}>
				<td>{ticket.title}</td>
				<td>{ticket.price}€</td>
				<td>
					<Link href={"/tickets/[ticketId]"} as={`/tickets/${ticket.id}`}>
						<a>View</a>
					</Link>
				</td>
			</tr>
		);
	});

	return currentUser !== null ? (
		<div>
			<h1>Tickets</h1>
			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>Link</th>
					</tr>
				</thead>
				<tbody>{ticketList}</tbody>
			</table>
		</div>
	) : (
		<h1>You are NOT signed in</h1>
	);
};

Index.getInitialProps = async (context, client, currentUser) => {
	const { data } = await client.get("/api/tickets");

	return { tickets: data };
};

export default Index;
