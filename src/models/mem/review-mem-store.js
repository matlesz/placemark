import { v4 } from "uuid";
import {locationMemStore} from "./location-mem-store.js"

let reviews = [];

export const reviewMemStore = {
    async getAllReviews() {
        return reviews;
    },

    async getUserReviews(userid) {
        return reviews.filter((review) => review.userid === userid);
    },

    async addReview(review) {
        review._id = v4();
        reviews.push(review);
        return review;
    },


    async deleteReviewById(id) {
        const index = reviews.findIndex((review) => review._id === id);
        if (index !==-1) reviews.splice(index, 1);
    },

    async deleteAllReviews() {
        reviews = [];
    },
};
