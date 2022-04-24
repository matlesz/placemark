import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testGeocaches, county } from "../fixtures.js";
import {assertSubset} from "../test-utils.js"


suite("Geocache Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.geocacheStore.deleteAllGeocaches();
    for (let i = 0; i < testGeocaches.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testGeocaches[i] = await db.geocacheStore.addGeocache(testGeocaches[i]);
    }
  });

  test("create a geocache", async () => {
    const geocache = await db.geocacheStore.addGeocache(county);
    assertSubset(county, geocache);
    assert.isDefined(geocache._id);
  });

  test("delete all geocaches", async () => {
    let returnedGeocaches = await db.geocacheStore.getAllGeocaches();
    assert.equal(returnedGeocaches.length, 3);
    await db.geocacheStore.deleteAllGeocaches();
    returnedGeocaches = await db.geocacheStore.getAllGeocaches();
    assert.equal(returnedGeocaches.length, 0);
  });

  test("get a geocache - success", async () => {
    const geocache = await db.geocacheStore.addGeocache(county);
    const returnedGeocache = await db.geocacheStore.getGeocacheById(geocache._id);
    assertSubset(county, geocache);
  });

  test("delete One Geocache - success", async () => {
    const id = testGeocaches[0]._id;
    await db.geocacheStore.deleteGeocacheById(id);
    const returnedPlaylists = await db.geocacheStore.getAllGeocaches();
    assertSubset(returnedPlaylists.length, testGeocaches.length - 1);
    const deletedGeocache = await db.geocacheStore.getGeocacheById(id);
    assert.isNull(deletedGeocache);
  });

  test("get a geocache - bad params", async () => {
    assert.isNull(await db.geocacheStore.getGeocacheById(""));
    assert.isNull(await db.geocacheStore.getGeocacheById());
  });

  test("delete One Geocache - fail", async () => {
    await db.geocacheStore.deleteGeocacheById("bad-id");
    const allGeocaches = await db.geocacheStore.getAllGeocaches();
    assertSubset(testGeocaches.length, allGeocaches.length);
  });
});
