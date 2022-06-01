import { userMemStore } from "./mem/user-mem-store.js";
import { geocacheMemStore } from "./mem/geocache-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { geocacheJsonStore } from "./json/geocache-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { reviewJsonStore } from "./json/review-json-store.js";
import {connectMongo} from "./mongo/connect.js"
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { geocacheMongoStore } from "./mongo/geocache-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { reviewMongoStore } from "./mongo/review-mongo-store.js";
import { reviewMemStore } from "./mem/review-mem-store.js";

export const db = {
  userStore: null,
  geocacheStore: null,
  locationStore:null,
  reviewStore:null,

  init(storeType) {
    switch(storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.geocacheStore = geocacheJsonStore;
        this.locationStore=locationJsonStore;
        this.reviewStore=reviewJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.geocacheStore= geocacheMongoStore;
        this.locationStore=locationMongoStore;
        this.reviewStore=reviewMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.geocacheStore = geocacheMemStore;
        this.locationStore=locationMemStore;
        this.reviewStore=reviewMemStore;
    }
  },
};
