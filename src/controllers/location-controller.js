
import {LocationSpec} from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const geocache = await db.geocacheStore.getGeocacheById(request.params.id);
      const location = await db.locationStore.getLocationById(request.params.locationid);
      const viewData = {
        title: "Edit location",
        geocache: geocache,
        location: location,
      };
      return h.view("update-location-view", viewData);
    },
  },


  update: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("update-location-view", { title: "Edit location error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
        const location = await db.locationStore.getLocationById(request.params.locationid);
        const newLocation = {
        name: request.payload.name,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        category: request.payload.category,
        size: request.payload.size,
      };
      try {
        await db.locationStore.updateLocation(request.params.locationid, newLocation);
      } catch (error) {
        console.log(error);
      }
      return h.redirect(`/geocache/${request.params.id}`);
    },
  },

  showLocationView: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.locationid);
      const viewData = {
        title: "Update location",
        location: location,
      };
      return h.view("update-location-view", viewData);
    },
  },
};
