import { assert } from "chai";
import { geocacheService } from "./geocache-service.js";
import { assertSubset } from "../test-utils.js";
import {maggie, maggieCredentials, county, testGeocaches} from "../fixtures.js"

suite("Geocache API tests", () => {

  let user=null;

  setup(async () => {
    geocacheService.clearAuth();
    user = geocacheService.createUser(maggie);
    await geocacheService.authenticate(maggieCredentials)
    await geocacheService.deleteAllGeocaches();
    await geocacheService.deleteAllUsers();
    user = geocacheService.createUser(maggie);
    await geocacheService.authenticate(maggieCredentials)
    county.userid=user._id;
  });

  teardown(async () => {});

  test("create geocache", async () => {
    const returnedGeocache = await geocacheService.createGeocache(county);
    assert.isNotNull(returnedGeocache);
    assertSubset(county,returnedGeocache);

  });

  test("delete a geocache", async () => {
    const geocache = await geocacheService.createGeocache(county);
    const response = await geocacheService.deleteGeocache(geocache._id);
    assert.equal(response.status, 204);
    try {
      const returnedGeocache = await geocacheService.getGeocache(geocache.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No geocache with this id", "Incorrect Response Message");  // test will fail if you put Geocache instead of geocache in this string
    }
  });


  test("create multiple geocaches", async () => {
    for (let i = 0; i < testGeocaches.length; i += 1) {
      testGeocaches[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await geocacheService.createGeocache(testGeocaches[i]);
    }
    let returnedLists = await geocacheService.getAllGeocaches();
    assert.equal(returnedLists.length, testGeocaches.length);
    await geocacheService.deleteAllGeocaches();
    returnedLists = await geocacheService.getAllGeocaches();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant geocache", async () => {
    try {
      const response = await geocacheService.deleteGeocache("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No geocache with this id", "Incorrect Response Message");
    }
  });
});
