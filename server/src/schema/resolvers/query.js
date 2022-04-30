const graphql = require("graphql");
const bcrypt = require("bcrypt");

const Post = require("../../models/post");
const User = require("../../models/user");
const { PostType, UserType } = require("../type-defs");

const { GraphQLObjectType, GraphQLList, GraphQLString } = graphql;

// Définition des roots queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Endpoint //
    getUser: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(_, { id }) {
        try {
          return User.findById(id);
        } catch (err) {
          return new Error(err);
        }
      },
    },

    // Endpoint //
    getAllPosts: {
      type: new GraphQLList(PostType),
      resolve: (_, __, { req, ___, ____ }) => {
        console.log(req.session)
        if (!req.session.user) {
          console.log("cookie non valide")
          return new Error("Invalid cookie");
        }

        console.log(req.session.user)

        return Post.find({});
      },
    },
  },
});

module.exports = RootQuery;
