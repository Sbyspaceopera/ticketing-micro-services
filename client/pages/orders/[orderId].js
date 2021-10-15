import Router from "next/router";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
	const [timeLeft, setTimeLeft] = useState(0);
	const { doRequest, errors } = useRequest({
		url: "/api/payments",
		method: "post",
		body: {
			orderId: order.id,
		},
		onSuccess: () => Router.push("/orders"),
	});

	useEffect(() => {
		const findTimeLeft = () => {
			const msLeft = new Date(order.expiresAt) - new Date();
			setTimeLeft(Math.round(msLeft / 1000 / 60));
		};
		findTimeLeft();
		const timerId = setInterval(findTimeLeft, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, [order]);

	if (timeLeft < 0) {
		return <div>Order Expired</div>;
	}

	return (
		<div>
			Time left to pay : {timeLeft} minutes
			<StripeCheckout
				token={({ id }) => doRequest({ token: id })}
				stripeKey="pk_test_51JkV1TAUqj2cjugP10jOZTosxhK3Eqd4pgQsKPBxybW6JrQdWaSdmW9uLAWLCOi4hP3gUSu5a0Fkf9b1VEx9rGnr00Q85EnJb2"
				amount={order.ticket.price * 100}
				email={currentUser.email}
			/>
			{errors}
		</div>
	);
};

OrderShow.getInitialProps = async (context, client) => {
	const { orderId } = context.query;
	const { data } = await client.get(`/api/orders/${orderId}`);

	return { order: data };
};

export default OrderShow;
