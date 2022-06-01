import Boom from "@hapi/boom";
import { IdSpec,ReviewArraySpec,ReviewSpec,ReviewSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const reviewApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const reviews = await db.reviewStore.getAllReviews();
                return reviews;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags:["api"],
        response: {schema: ReviewArraySpec, failAction:validationError},
        description: "Get all reviews",
        notes: "Returns all reviews"
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        async handler(request) {
            try {
                const review = await db.reviewStore.getReviewById(request.params.id);
                if (!review) {
                    return Boom.notFound("No review with this id");
                }
                return review;
            } catch (err) {
                return Boom.serverUnavailable("No review with this id");
            }
        },
        tags:["api"],
        response: {schema: ReviewSpecPlus, failAction:validationError},
        description: "Find a review",
        notes: "Returns all review",
        validate:{ params: { id: IdSpec }, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try{
                const review = request.payload;
                const newReview= await db.reviewStore.addReview(review);
                if (newReview){
                    return h.response(newReview).code(201);
                }
                return Boom.badImplementation("Error creating the review");
            }
            catch(err){
                return Boom.serverUnavailable("Database server error")
            }
        },
        tags: ["api"],
        description: "Create a review",
        notes: "Returns newly created review",
        validate: { payload: ReviewSpec, failAction: validationError },
        response: { schema: ReviewSpecPlus, failAction:validationError },
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const review = await db.reviewStore.getReviewById(request.params.id);
                if (!review) {
                    return Boom.notFound("No review with this id");
                }
                await db.reviewStore.deleteReviewById(review._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No review with this id");
            }
        },
        tags: ["api"],
        description: "Delete a review",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },    handler: async function (request, h) {
            try{
                await db.reviewStore.deleteAllReviews();
                return h.response().code(204);
            }
            catch(err){
                return Boom.serverUnavailable("Database Error")
            }
        },
        tags: ["api"],
        description: "Delete all ReviewApi",
    },


};
