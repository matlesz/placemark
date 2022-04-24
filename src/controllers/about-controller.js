export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Geocache logger",
      };
      return h.view("about-view", viewData);
    },
  },
};
