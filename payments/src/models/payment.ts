import mongoose from "mongoose";

interface PaymentAttrs {
	orderId: string;
	stripeId: string;
}

//Versionning is not needed, those datas will never change
interface PaymentDoc extends mongoose.Document {
	orderId: string;
	stripeId: string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
	build(attrs: PaymentAttrs): PaymentDoc;
}

const paymentSchema = new mongoose.Schema(
	{
		orderId: {
			required: true,
			type: String,
		},
		stripeId: {
			required: true,
			type: String,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret;
				delete ret._id;
			},
		},
	}
);

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
	return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
	"Payment",
	paymentSchema
);

export { Payment };
