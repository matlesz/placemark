import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { geocacheController } from "./controllers/geocache-controller.js";
import { locationController } from "./controllers/location-controller.js";
import { adminController } from "./controllers/admin-access-controller.js";


export const webRoutes = [
  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "GET", path: "/user-account", config: accountsController.loggedInUserDetails },
  { method: "POST", path: "/updateUserDetails", config: accountsController.updateLoggedInUser },
  { method: "GET", path: "/deleteUserAccount", config: accountsController.deleteUserAccount },


  { method: "GET", path: "/admin-access", config: adminController.index},
  { method: "GET", path: "/admin-access/deleteUser/{id}", config: adminController.deleteUser },


  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addGeocache", config: dashboardController.addGeocache },
  { method: "GET", path: "/geocache/{id}", config: geocacheController.index },
  { method: "GET", path: "/dashboard/deleteGeocache/{id}", config: dashboardController.deleteGeocache },


  { method: "POST", path: "/geocache/{id}/addLocation", config: geocacheController.addLocation },
  { method: "GET", path: "/geocache/{id}/deleteLocation/{locationid}", config: geocacheController.deleteLocation },
  { method: "GET", path: "/geocache/{id}/location/{locationid}", config: locationController.showLocationView },
  { method: "POST", path: "/geocache/{id}/location/{locationid}", config: locationController.update },


  // to handle images in public folder..uses npm inert plugin
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }

];
