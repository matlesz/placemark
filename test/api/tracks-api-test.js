import { assert } from "chai";
import { geocacheService } from "./geocache-service.js";
import { assertSubset } from "../test-utils.js";
import {maggie, maggieCredentials, county,testStations} from "../fixtures.js"

suite("Station API tests", () => {

  let user=null;

  setup(async () => {
    geocacheService.clearAuth();
    user = geocacheService.createUser(maggie);
    await geocacheService.authenticate(maggieCredentials)
    await geocacheService.deleteAllStations();
    await geocacheService.deleteAllUsers();
    user = geocacheService.createUser(maggie);
    await geocacheService.authenticate(maggieCredentials)
    county.userid=user._id;
  });

  teardown(async () => {});

  test("create station", async () => {
    const returnedStation = await geocacheService.createStation(county);
    assert.isNotNull(returnedStation);
    assertSubset(county,returnedStation);

  });

  test("delete a station", async () => {
    const station = await geocacheService.createStation(county);
    const response = await geocacheService.deleteStation(station._id);
    assert.equal(response.status, 204);
    try {
      const returnedStation = await geocacheService.getStation(station.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No station with this id", "Incorrect Response Message");  // test will fail if you put Station instead of station in this string
    }
  });


  test("create multiple stations", async () => {
    for (let i = 0; i < testStations.length; i += 1) {
      testStations[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await geocacheService.createStation(testStations[i]);
    }
    let returnedLists = await geocacheService.getAllStations();
    assert.equal(returnedLists.length, testStations.length);
    await geocacheService.deleteAllStations();
    returnedLists = await geocacheService.getAllStations();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant station", async () => {
    try {
      const response = await geocacheService.deleteStation("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No station with this id", "Incorrect Response Message");
    }
  });
});
