const graphql = require("graphql");

const Post = require("../../models/post");
const User = require("../../models/user");
const { PostType, UserType } = require("../type-defs");

const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } =
  graphql;

// Définition des roots queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Endpoint //
    getAllPosts: {
      type: new GraphQLList(PostType),
      resolve: (_, __, { req, ___, ____ }) => {
        if (!req.session.user) {
          console.log("cookie non valide");
          return new Error("Invalid cookie");
        }

        console.log(req.session.user);

        return Post.find({});
      },
    },
    // Endpoint //
    getMyPosts: {
      type: new GraphQLList(PostType),
      args: {
        authorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { authorId }, { req, ___, ____ }) => {
        if (!req.session.user) {
          console.log("cookie non valide");
          return new Error("Invalid cookie");
        }

        return Post.find({ authorId });
      },
    },
  },
});

module.exports = RootQuery;
