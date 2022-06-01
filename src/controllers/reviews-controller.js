import { db } from "..models/db.js";

export const reviewsController = {
    index: {
        handler: async function (request, h) {
            const comment = await db.reviewStore.getAllComments();
            const viewData = {
                title: "Comments",
                comment: comment
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
            await db.reviewStore.addReview(location._id, newReviews);
            return h.redirect(`/reviews/addReview`);
        }
    }
};
