import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  category:String,
  description:String,
  geocacheid: {
    type: Schema.Types.ObjectId,
    ref: "Geocache",
  },
});

export const Location = Mongoose.model("Location", locationSchema);
