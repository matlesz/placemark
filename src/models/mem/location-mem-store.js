import { v4 } from "uuid";

let locations = [];

export const locationMemStore = {
  async getAllLocations() {
    return locations;
  },

  async addLocation(geocacheId, location) {
    location._id = v4();
    location.geocacheid = geocacheId;
    locations.push(location);
    return location;
  },

  async getLocationsByGeocacheId(id) {
    return locations.filter((location) => location.geocacheid === id);
  },

  async getLocationById(id) {
    return locations.find((location) => location._id === id);
  },

  async getGeocacheLocations(geocacheId) {
    return locations.filter((location) => location.geocacheid === geocacheId);
  },

  async deleteLocation(id) {
    const index = locations.findIndex((location) => location._id === id);
    locations.splice(index, 1);
  },

  async deleteAllLocations() {
    locations = [];
  },

  async updateLocation(location, updatedLocation) {
    location.name = updatedLocation.name;
    location.latitude = updatedLocation.latitude;
    location.longitude = updatedLocation.duration;
  },
};
