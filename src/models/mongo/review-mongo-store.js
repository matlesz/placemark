import { Review } from "./reviews.js";
import { locationMongoStore } from "./location-mongo-store.js";

export const reviewMongoStore = {
    async getAllReviews() {
        const reviews = await Review.find().lean();
        return reviews;
    },

    async getAllReviewsByTitle() {
        const reviews = await Review.findAll().lean();
        return reviews.title;
    },

    async getReviewById(id) {
        const review = await Review.findById(id).lean();
        return review;
    },

    async addReview(review) {
        const newReview = new Review(review);
        const reviewObj = await newReview.save();
        return this.getReviewById(reviewObj._id);
    },

    async deleteReviewById(id) {
        try {
            await Review.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllReviews() {
        await Review.deleteMany({});
    }
};
