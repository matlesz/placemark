import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
    .keys({
        email: Joi.string().email().example("homer@simpson.com").required(),
        password: Joi.string().example("secret").required(),
    })
    .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    role:Joi.string().example("admin").optional(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const LocationSpec = Joi.object()
    .keys({
        name: Joi.string().required().example("Loong Avenue"),
        latitude: Joi.number().example(32).required(),
        longitude: Joi.number().example(18).required(),
        category:Joi.string().example("Traditional").required(),
        size: Joi.string().example("Micro").required(),
        geocacheid: IdSpec,
    })
    .label("Location");

export const LocationSpecPlus = LocationSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");

export const GeocacheSpec = Joi.object()
    .keys({
        name: Joi.string().required().example("Waterford"),
        userid: IdSpec,
        locations: LocationArraySpec,
    })
    .label("Geocache");

export const GeocacheSpecPlus = GeocacheSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("GeocachePlus");

export const GeocacheArraySpec = Joi.array().items(GeocacheSpecPlus).label("GeocacheArray");

export const ReviewSpec = Joi.object()
    .keys({
        title: Joi.string().required().example("Loong Avenue review."),
        date: Joi.date().example("01.01.2022").required(),
        body: Joi.string().example("Very good geocache").required(),
        geocacheid: IdSpec,
    })
    .label("Review");

export const ReviewSpecPlus = ReviewSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("ReviewPlus");

export const ReviewArraySpec = Joi.array().items(ReviewSpecPlus).label("ReviewArray");

export const JwtAuth = Joi.object()
    .keys({
        success: Joi.boolean().example("true").required(),
        token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    })
    .label("JwtAuth");
