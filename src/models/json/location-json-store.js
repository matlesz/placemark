import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile,Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/locations.json"));
db.data={ locations :[]}



export const locationJsonStore = {
  async getAllLocations() {
    await db.read();
    return db.data.locations;
  },

  async addLocation(geocacheId, location) {
    await db.read();
    location._id = v4();
    location.geocacheid = geocacheId;
    db.data.locations.push(location);
    await db.write();
    return location;
  },

  async getLocationsByGeocacheId(id) {
    await db.read()
    return db.data.locations.filter((location) => location.geocacheid === id);
  },

  async getLocationById(id) {
    await db.read();
    return db.data.locations.find((location) => location._id === id);
  },

  async getGeocacheLocations(geocacheId) {
    return locations.filter((location) => location.geocacheid === geocacheId);
  },

  async deleteLocation(id) {
    await db.read();
    const index = db.data.locations.findIndex((location) => location._id === id);
    db.data.locations.splice(index, 1);
    await db.write();
  },

  async deleteAllLocations() {
    db.data.locations=[];
    await db.write();
  },

  async updateLocation(location, updatedLocation) {
    location.name = updatedLocation.name;
    location.latitude = updatedLocation.latitude;
    location.longitude = updatedLocation.duration;
    await db.write();
  },
};
