export const seedData = {

  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      role:"regular"


    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      role:"regular"


    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      role:"regular"


    },
  },

  geocaches: {
    _model: "Geocache",
    county_1: {
      name: "Waterford",
      userid: "->users.bart",
    },
    county_2: {
      name: "Cork",
      userid: "->users.homer",
    },
    county_3: {
      name: "Kerry",
      userid: "->users.marge",
    },
  },

  locations: {
    _model: "Location",
    location_1: {
      name: "Loong Avenus",
      latitude: 5322.401,
      longitude: 614.469,
      category: "Traditional",
      size: "micro",
      geocacheid: "->geocaches.county_1",
    },
    location_2: {
      name: "No Roulette Here",
      latitude: 5322.337,
      longitude: 613.419,
      category: "Traditional",
      size: "micro",
      geocacheid: "->geocaches.county_2",
    },
    location_3: {
      name: "Irish Moai",
      latitude: 5333.227,
      longitude: 612.529,
      category: "Traditional",
      size: "micro",
      geocacheid: "->geocaches.county_3",
    },

    reviews: {
      _model: "Review",
      review_1: {
        title: "Loong Avenues review",
        date: "01.02.2022",
        body: "this was great find in magical place.",
        geocacheid: "->geocaches.county_1",
      },
      review_2: {
        title: "No Roulette Here review",
        date: "22.06.2022",
        body: "I almost give up. it was hard to spot.",
        geocacheid: "->geocaches.county_2",
      },
      review_3: {
        title: "Irish Moai review",
        date: "15.04.2022",
        body: "It's like I was there.",
        geocacheid: "->geocaches.county_3",
      },
    }
  },
};
