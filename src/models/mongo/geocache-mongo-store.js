import { Geocache } from "./geocaches.js";
import { locationMongoStore } from "./location-mongo-store.js";

export const geocacheMongoStore = {
  async getAllGeocaches() {
    const geocaches = await Geocache.find().lean();
    return geocaches;
  },

  async getAllGeocachesByName() {
    const geocaches = await Geocache.findAll().lean();
    return geocaches.name;
  },



  async getGeocacheById(id) {
    if (id) {
      const geocache = await Geocache.findOne({ _id: id }).lean();
      if (geocache) {
        geocache.locations = await locationMongoStore.getLocationsByGeocacheId(geocache._id);
      }
      return geocache;
    }
    return null;
  },

  async addGeocache(geocache) {
    const newGeocache = new Geocache(geocache);
    const geocacheObj = await newGeocache.save();
    return this.getGeocacheById(geocacheObj._id);
  },

  async getUserGeocaches(id) {
    const geocache = await Geocache.find({ userid: id }).lean();
    return geocache;
  },

  async deleteGeocacheById(id) {
    try {
      await Geocache.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllGeocaches() {
    await Geocache.deleteMany({});
  }
};
