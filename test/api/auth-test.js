import { assert } from "chai";
import { geocacheService } from "./geocache-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import {maggie, maggieCredentials} from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    geocacheService.clearAuth();
    await geocacheService.createUser(maggie);
    await geocacheService.authenticate(maggie);
    await geocacheService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await geocacheService.createUser(maggie);
    const response = await geocacheService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await geocacheService.createUser(maggie);
    const response = await geocacheService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });



  test("check Unauthorized", async () => {
    geocacheService.clearAuth();
    try {
      await geocacheService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });

});
