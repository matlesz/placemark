import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    title: String,
    date: Number,
    body:String,
    geocacheid: {
        type: Schema.Types.ObjectId,
        ref: "Geocache",
    },
});

export const Review = Mongoose.model("Review", reviewSchema);
