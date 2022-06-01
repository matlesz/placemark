import { Location } from "./locations.js";

export const locationMongoStore = {


  async getLocationsByGeocacheId(id) {
    const locations = await Location.find({ geocacheid: id }).lean();
    return locations;
  },

  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async addLocation(geocacheId, location) {
    location.geocacheid = geocacheId;
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },


  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      return location;
    }
    return null;
  },



  async deleteLocation(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  async updateLocation(locationid, updatedLocation) {
    const location= await Location.findOne({_id:locationid})
    location.name = updatedLocation.name;
    location.latitude = updatedLocation.latitude;
    location.longitude = updatedLocation.longitude;
    location.category= updatedLocation.category;
    location.size= updatedLocation.size;
    await location.save();
  },


};

