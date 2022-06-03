import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile,Low } from "lowdb";


const db = new Low(new JSONFile("./src/models/json/reviews.json"));
db.data = { reviews: [] };

export const reviewJsonStore = {
    async getAllReviews() {
        await db.read();
        return db.data.reviews;
    },


    async addReview(review) {
        review._id = v4();
        await db.read();
        db.data.reviews.push(review);
        await db.write();
        return review;
    },


    async deleteReviewById(id) {
        await db.read();
        const index = db.data.reviews.findIndex((review) => review._id === id);
        if (index !==-1) db.data.reviews.splice(index, 1);
        await db.write();
    },

    async deleteAllReviews() {
        db.data.reviews = [];
        await db.write();
    },
};
