import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      _id
      username
    }
  }
`;

const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      username
    }
  }
`;

const ADD_POST = gql`
  mutation ($imgUrl: String!, $description: String!, $authorId: String!) {
    addPost(imgUrl: $imgUrl, description: $description, authorId: $authorId) {
      _id
    }
  }
`;

const DELETE_POST = gql`
  mutation ($id: String!) {
    deletePost(id: $id) {
      _id
    }
  }
`;

const ADD_COMMENT = gql`
  mutation ($postId: String!, $author: String!, $text: String!) {
    addComment(postId: $postId, author: $author, text: $text) {
      comments {
        author
        text
      }
    }
  }
`;

const LIKE_POST = gql`
  mutation ($postId: String!, $arrayOfLikes: [String]!) {
    likePost(postId: $postId, arrayOfLikes: $arrayOfLikes) {
      like
    }
  }
`;

const UNLIKE_POST = gql`
  mutation ($postId: String!, $arrayOfLikes: [String]!) {
    unlikePost(postId: $postId, arrayOfLikes: $arrayOfLikes) {
      like
    }
  }
`;

export {
  REGISTER_USER,
  LOGIN_USER,
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  LIKE_POST,
  UNLIKE_POST,
};
