const graphql = require("graphql");
const bcrypt = require("bcrypt");

const User = require("../../models/user");
const Post = require("../../models/post");
const { PostType, UserType } = require("../type-defs");
const passwordValidation = require("../../helpers/passwordValidation");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Endpoint //
    register: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { username, email, password }, { req, __, ___ }) => {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return new Error("This user already exists, try to login");
        }

        if (!existingUser) {
          const hashPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            username,
            email,
            password: hashPassword,
            profilPictureUrl: "",
          });

          req.session.user = newUser;

          return newUser.save();
        }
      },
    },

    // Endpoint //
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { email, password }, { req, __, ___ }) => {
        const user = await User.findOne({ email });

        if (!user) {
          return new Error("Invalid email");
        }

        const isMatch = passwordValidation(user, password);

        if (!isMatch) {
          return new Error("Invalid password");
        }

        req.session.user = user;

        return user;
      },
    },
    // Endpoint //
    addPost: {
      type: PostType,
      args: {
        imgUrl: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { imgUrl, description, authorId }) {
        const newPost = new Post({
          imgUrl,
          description,
          authorId,
          numberOfLikes: 0,
          comments: [],
        });
        return newPost.save();
      },
    },
    // Endpoint //
    deletePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { id }) {
        try {
          return Post.findByIdAndDelete(id);
        } catch (err) {
          return err;
        }
      },
    },
    // Endpoint //
    likePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { id }) {
        try {
          return Post.findByIdAndUpdate(id, {
            $inc: { numberOfLikes: 1 },
          });
        } catch (err) {
          return err;
        }
      },
    },
    // Endpoint //
    unlikePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { id }) {
        try {
          return Post.findByIdAndUpdate(id, {
            $inc: { numberOfLikes: -1 },
          });
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    // Endpoint //
    addComment: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { id, text, author }) {
        try {
          return Post.findByIdAndUpdate(id, {
            $push: { comments: { text, author } },
          });
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    // Endpoint //
    changeUsername: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        newUsername: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, { id, newUsername }) {
        try {
          return User.findByIdAndUpdate(id, {
            $set: { username: newUsername },
          });
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    // Endpoint //
    changePassword: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        currPassword: { type: new GraphQLNonNull(GraphQLString) },
        newPassword: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (_, { id, currPassword, newPassword }) => {
        try {
          const user = await User.findById(id);
          if (!user) {
            console.log("Something went wrong");
            throw new Error("Non existing user");
          }

          await passwordValidation(user, currPassword);

          const hashPassword = await bcrypt.hash(newPassword, 10);
          return User.findByIdAndUpdate(id, {
            $set: { password: hashPassword },
          });
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
  },
});

module.exports = Mutation;
