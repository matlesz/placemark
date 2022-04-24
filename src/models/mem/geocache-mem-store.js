import { v4 } from "uuid";
import {locationMemStore} from "./location-mem-store.js"

let geocaches = [];

export const geocacheMemStore = {
  async getAllGeocaches() {
    return geocaches;
  },

  async getUserGeocaches(userid) {
    return geocaches.filter((geocache) => geocache.userid === userid);
  },

  async addGeocache(geocache) {
    geocache._id = v4();
    geocaches.push(geocache);
    return geocache;
  },

  async getGeocacheById(id) {
    const list= geocaches.find((geocache) => geocache._id === id);
    if (list){
      list.locations= await locationMemStore.getLocationsByGeocacheId(list._id);
      return list;
    }
    return null;
  },

  async deleteGeocacheById(id) {
    const index = geocaches.findIndex((geocache) => geocache._id === id);
    if (index !==-1) geocaches.splice(index, 1);
  },

  async deleteAllGeocaches() {
    geocaches = [];
  },
};
