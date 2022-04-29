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
      resolve: (_, __, { req, res, next }) => {
        if (!req.session.isAuth) {
          return res.redirect("/register");
        }

        next();

        return Post.find({});
      },
    },
  },
});

module.exports = RootQuery;
