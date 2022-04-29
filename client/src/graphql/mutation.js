import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      username
      _id
    }
  }
`;

const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      _id
    }
  }
`;

const CREATE_POST = gql`
  mutation (
    $title: String!
    $description: String!
    $imgUrl: String!
    $authorId: String!
  ) {
    createPost(
      title: $title
      description: $description
      imgUrl: $imgUrl
      authorId: $authorId
    ) {
      title
    }
  }
`;

const SAVE_POST = gql`
  mutation ($userId: String!, $postId: String!) {
    savePost(userId: $userId, postId: $postId) {
      username
    }
  }
`;

export { REGISTER_USER, LOGIN_USER, CREATE_POST, SAVE_POST };