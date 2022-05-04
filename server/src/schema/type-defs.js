const graphql = require("graphql");

const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLInt } =
  graphql;
const User = require("../models/user");
const Post = require("../models/post");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    profilPictureUrl: { type: GraphQLString },
    _id: { type: GraphQLID },
    posts: {
      type: new GraphQLList(PostType),
      resolve({ _id }) {
        try {
          return Post.find({
            authorId: _id,
          });
        } catch (err) {
          return new Error(err);
        }
      },
    },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    imgUrl: { type: GraphQLString },
    description: { type: GraphQLString },
    like: { type: new GraphQLList(GraphQLString) },
    comments: { type: new GraphQLList(CommentType) },
    _id: { type: GraphQLID },
    author: {
      type: UserType,
      resolve({ authorId }) {
        return User.findById(authorId);
      },
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    text: { type: GraphQLString },
    author: { type: GraphQLString },
  }),
});

module.exports = { UserType, PostType, CommentType };
