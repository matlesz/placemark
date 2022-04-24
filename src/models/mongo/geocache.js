import Mongoose from "mongoose";

const { Schema } = Mongoose;

const geocacheSchema = new Schema({
  name: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Geocache = Mongoose.model("Geocache", geocacheSchema);
