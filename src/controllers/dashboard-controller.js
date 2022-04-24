import { db } from "../models/db.js";
import { GeocacheSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const geocaches = await db.geocacheStore.getUserGeocaches(loggedInUser._id);
      const viewData = {
        name: "geocache Dashboard",
        geocaches: geocaches,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addGeocache: {
    validate: {
      payload: GeocacheSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        const geocaches = await db.geocacheStore.getUserGeocaches(loggedInUser._id);
        return h.view("dashboard-view", { title: "Add Geocache error",geocaches:geocaches, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newGeocache = {
        userid: loggedInUser._id,
        name: request.payload.name,
      };
      await db.geocacheStore.addGeocache(newGeocache);
      return h.redirect("/dashboard");
    },
  },

  deleteGeocache: {
    handler: async function (request, h) {
      const geocache = await db.geocacheStore.getGeocacheById(request.params.id);
      await db.geocacheStore.deleteGeocacheById(geocache._id);
      return h.redirect("/dashboard");
    },
  },
};
