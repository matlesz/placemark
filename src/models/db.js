import { userMemStore } from "./mem/user-mem-store.js";
import { playlistMemStore } from "./mem/location-mem-store.js";
import { trackMemStore } from "./mem/geocache-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { playlistJsonStore } from "./json/location-json-store.js";
import { trackJsonStore } from "./json/geocache-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { trackMongoStore } from "./mongo/geocache-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  playlistStore: null,
  trackStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.playlistStore = playlistJsonStore;
        this.trackStore = trackJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.playlistStore = locationMongoStore;
        this.trackStore = trackMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.playlistStore = playlistMemStore;
        this.trackStore = trackMemStore;
    }
  }
};
