// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { geocacheService } from "./geocache-service.js";
import { maggie,maggieCredentials, locationArea, testLocations, county } from "../fixtures.js"

suite("Location API tests", () => {
  let user = null;
  let stationModel = null;

  setup(async () => {
    geocacheService.clearAuth();
    user = await geocacheService.createUser(maggie);
    await geocacheService.authenticate(maggieCredentials)
    await geocacheService.deleteAllStations();
    await geocacheService.deleteAllLocations();
    await geocacheService.deleteAllUsers();
    user = await geocacheService.createUser(maggie);
    await geocacheService.authenticate(maggieCredentials)
    county.userid = user._id;
    stationModel = await geocacheService.createStation(county);
  });

  teardown(async () => {});

  test("Create Location", async () => {
    const returnedLocation = await geocacheService.createLocation(stationModel._id, locationArea);
    assertSubset(locationArea, returnedLocation);
  });

  test("Create Multiple Locations", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await geocacheService.createLocation(stationModel._id, testLocations[i]);
    }
    const returnedLocations = await geocacheService.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length);
    for (let i = 0; i < returnedLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const location = await geocacheService.getLocation(returnedLocations[i]._id);
      assertSubset(location, returnedLocations[i]);
    }
  });

  test("Delete LocationApi", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await geocacheService.createLocation(stationModel._id, testLocations[i]);
    }
    let returnedLocations = await geocacheService.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length);
    for (let i = 0; i < returnedLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const location = await geocacheService.deleteLocation(returnedLocations[i]._id);
    }
    returnedLocations = await geocacheService.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("Denormalised Station", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await geocacheService.createLocation(stationModel._id, testLocations[i]);
    }
    const returnedStation = await geocacheService.getStation(stationModel._id);
    assert.equal(returnedStation.locations.length, testLocations.length);
    for (let i = 0; i < testLocations.length; i += 1) {
      assertSubset(testLocations[i], returnedStation.locations[i]);
    }
  });
});
