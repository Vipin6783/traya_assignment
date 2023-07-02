import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

var orderSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: false,
    },
    ordered_by: [
      new Schema({
        _id: false,
        user_id: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        rating_count: {
          type: Number,
          required: false,
        },
        feedback: {
          type: String,
          required: false,
        },
      }),
    ],
  },
  { timestamps: true }
);

export default mongoose.model("orders", orderSchema);
