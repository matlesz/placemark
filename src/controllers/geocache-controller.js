import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";

export const geocacheController = {
  index: {
    handler: async function (request, h) {
      const geocache = await db.geocacheStore.getGeocacheById(request.params.id);
      const viewData = {
        name: "Geocache",
        geocache: geocache,
      };
      return h.view("geocache-view", viewData);
    },
  },

  addLocation: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const geocache= await db.geocacheStore.getGeocacheById(request.params.id);
          return h.view("geocache-view",{title: "Error adding location",geocache:geocache,errors:error.details}).takeover().code(400);

      },
    },
    handler: async function (request, h) {
      const geocache = await db.geocacheStore.getGeocacheById(request.params.id);
      const newLocation = {
        name: request.payload.name,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        category:request.payload.category,
        size:request.payload.size,
      };
      await db.locationStore.addLocation(geocache._id, newLocation);
      return h.redirect(`/geocache/${geocache._id}`);
    },
  },

  deleteLocation: {
    handler: async function(request, h) {
      const geocache = await db.geocacheStore.getGeocacheById(request.params.id);
      await db.locationStore.deleteLocation(request.params.locationid);
      return h.redirect(`/geocache/${geocache._id}`);
    },
  },
};
