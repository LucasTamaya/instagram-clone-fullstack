const graphql = require("graphql");
const { GraphQLSchema } = graphql;

const RootQuery = require("./resolvers/query");
const Mutation = require("./resolvers/mutation");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
