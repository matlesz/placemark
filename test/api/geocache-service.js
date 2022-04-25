/* eslint-disable dot-notation */
import axios from "axios";
import { serviceUrl } from "../fixtures.js";


export const geocacheService={
  placemarkUrl: serviceUrl,

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    // eslint-disable-next-line dot-notation
    // eslint-disable-next-line prefer-template
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async createGeocache(geocache) {
    const res = await axios.post(`${this.placemarkUrl}/api/geocaches`, geocache);
    return res.data;
  },

  async deleteAllGeocaches() {
    const response = await axios.delete(`${this.placemarkUrl}/api/geocaches`);
    return response.data;
  },

  async deleteGeocache(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/geocaches/${id}`);
    return response;
  },

  async getAllGeocaches() {
    const res = await axios.get(`${this.placemarkUrl}/api/geocaches`);
    return res.data;
  },

  async getGeocache(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/geocaches/${id}`);
    return res.data;
  },

  async getAllLocations() {
    const res = await axios.get(`${this.placemarkUrl}/api/locations`);
    return res.data;
  },

  async createLocation(geocacheid, location) {
    location.geocacheid = geocacheid;
    const res = await axios.post(`${this.placemarkUrl}/api/geocaches/${geocacheid}/locations`, location);
    return res.data;
  },

  async getLocation(id) {
    try {
      const res = await axios.get(`${this.placemarkUrl}/api/locations/${id}`);
      return res.data;
    } catch (error) {
      console.log("no such id");
      return null;
    }
  },

  async deleteLocation(id) {
    try {
      await axios.delete(`${this.placemarkUrl}/api/locations/${id}`);
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations`);
    return res.data;
  },
};
