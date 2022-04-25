import Boom from "@hapi/boom";
import { IdSpec,GeocacheArraySpec,GeocacheSpec,GeocacheSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const geocacheApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const geocaches = await db.geocacheStore.getAllGeocaches();
        return geocaches;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags:["api"],
    response: {schema: GeocacheArraySpec, failAction:validationError},
    description: "Get all geocaches",
    notes: "Returns all geocaches"
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const geocache = await db.geocacheStore.getGeocacheById(request.params.id);
        if (!geocache) {
          return Boom.notFound("No geocache with this id");
        }
        return geocache;
      } catch (err) {
        return Boom.serverUnavailable("No geocache with this id");
      }
    },
    tags:["api"],
    response: {schema: GeocacheSpecPlus, failAction:validationError},
    description: "Find a geocache",
    notes: "Returns all geocache",
    validate:{ params: { id: IdSpec }, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try{
        const geocache = request.payload;
        const newGeocache= await db.geocacheStore.addGeocache(geocache);
        if (newGeocache){
          return h.response(newGeocache).code(201);
        }
        return Boom.badImplementation("Error creating the geocache");
      }
      catch(err){
        return Boom.serverUnavailable("Database server error")
      }
    },
    tags: ["api"],
    description: "Create a geocache",
    notes: "Returns newly created geocache",
    validate: { payload: GeocacheSpec, failAction: validationError },
    response: { schema: GeocacheSpecPlus, failAction:validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const geocache = await db.geocacheStore.getGeocacheById(request.params.id);
        if (!geocache) {
          return Boom.notFound("No geocache with this id");
        }
        await db.geocacheStore.deleteGeocacheById(geocache._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No geocache with this id");
      }
    },
    tags: ["api"],
    description: "Delete a geocache",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },    handler: async function (request, h) {
      try{
        await db.geocacheStore.deleteAllGeocaches();
        return h.response().code(204);
      }
      catch(err){
        return Boom.serverUnavailable("Database Error")
      }
    },
    tags: ["api"],
    description: "Delete all GeocacheApi",
  },


};
