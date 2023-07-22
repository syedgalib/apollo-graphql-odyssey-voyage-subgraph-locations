const resolvers = {
  Query: {
    locations: (_, __, { dataSources }) => {
      return [];
      // return dataSources.locationsAPI.getAllLocations();
    },
    location: (_, { id }, { dataSources }) => {
      return dataSources.locationsAPI.getLocation(id);
    },
  },
};

export default resolvers;