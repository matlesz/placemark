import Mongoose from "mongoose";

const { Schema } = Mongoose;

const reviewSchema = new Schema({
    title: String,
    date: Date,
    body: String,
});

export const Review = Mongoose.model("Review", reviewSchema);
