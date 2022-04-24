import { userApi } from "./api/user-api.js";
import { geocacheApi } from "./api/geocache-api.js";
import { locationApi } from "./api/location-api.js"



export const apiRoutes= [

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },


  {method: "POST", path: "/api/users", config: userApi.create},
  {method: "GET", path: "/api/users", config: userApi.find},
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },


  { method: "POST", path: "/api/geocaches", config: geocacheApi.create },
  { method: "DELETE", path: "/api/geocaches", config: geocacheApi.deleteAll },
  { method: "GET", path: "/api/geocaches", config: geocacheApi.find },
  { method: "GET", path: "/api/geocaches/{id}", config: geocacheApi.findOne },
  { method: "DELETE", path: "/api/geocaches/{id}", config: geocacheApi.deleteOne },


  { method: "GET", path: "/api/locations", config: locationApi.find },
  { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
  { method: "POST", path: "/api/geocaches/{id}/locations", config: locationApi.create },
  { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
  { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },
]
