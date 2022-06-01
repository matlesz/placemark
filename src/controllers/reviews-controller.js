import {ReviewSpec} from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const reviewsController = {
    index: {
        handler: async function (request, h) {
            const review = await db.reviewStore.getAllReviews();
            const viewData = {
                title: "Reviews",
                review: review
            };

            return h.redirect(`/reviews` , viewData);
        },
    },

    addReview: {
        handler: async function (request, h) {
            const date = new Date().toLocaleString("en-IE");

            const newReviews = {
                title: request.payload.title,
                date: date,
                body: request.payload.body
            };
            await db.reviewStore.addReview(geocache._id, newReviews);
            return h.redirect(`/reviews/addReview`);
        }
    }
};
