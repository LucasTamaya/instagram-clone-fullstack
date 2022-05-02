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

export { REGISTER_USER, LOGIN_USER, ADD_POST, ADD_COMMENT };
