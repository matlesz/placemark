import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile,Low } from "lowdb";
import {locationJsonStore} from "./location-json-store.js"

const db = new Low(new JSONFile("./src/models/json/geocaches.json"));
db.data = { geocaches: [] };

export const geocacheJsonStore = {
  async getAllGeocaches() {
    await db.read();
    return db.data.geocaches;
  },

  async getUserGeocaches(userid) {
    await db.read();
    return db.data.geocaches.filter((geocache) => geocache.userid === userid);
  },

  async addGeocache(geocache) {
    geocache._id = v4();
    await db.read();
    db.data.geocaches.push(geocache);
    await db.write();
    return geocache;
  },

  async getGeocacheById(id) {
    await db.read();
    let list= db.data.geocaches.find((geocache) => geocache._id === id);
    if (list){
      list.locations= await locationJsonStore.getLocationsByGeocacheId(list._id);

    }
    else {
      list=null
    }
    return list;
  },

  async deleteGeocacheById(id) {
    await db.read();
    const index = db.data.geocaches.findIndex((geocache) => geocache._id === id);
    if (index !==-1) db.data.geocaches.splice(index, 1);
    await db.write();
  },

  async deleteAllGeocaches() {
    db.data.geocaches = [];
    await db.write();
  },
};
