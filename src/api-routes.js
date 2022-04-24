import { userApi } from "./api/user-api.js";
import { categoryApi } from "./api/location-api.js";
import { trackApi } from "./api/geocache-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/playlists", config: categoryApi.create },
  { method: "DELETE", path: "/api/playlists", config: categoryApi.deleteAll },
  { method: "GET", path: "/api/playlists", config: categoryApi.find },
  { method: "GET", path: "/api/playlists/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/playlists/{id}", config: categoryApi.deleteOne },

  { method: "GET", path: "/api/tracks", config: trackApi.find },
  { method: "GET", path: "/api/tracks/{id}", config: trackApi.findOne },
  { method: "POST", path: "/api/playlists/{id}/tracks", config: trackApi.create },
  { method: "DELETE", path: "/api/tracks", config: trackApi.deleteAll },
  { method: "DELETE", path: "/api/tracks/{id}", config: trackApi.deleteOne },
];
