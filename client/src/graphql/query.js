import { gql } from "@apollo/client";

const GET_ALL_POSTS = gql`
  {
    getAllPosts {
      imgUrl
      description
      like
      comments {
        text
        author
      }
      _id
      author {
        username
        profilPictureUrl
      }
    }
  }
`;

const SINGLE_POST = gql`
  query ($id: String!) {
    singlePost(id: $id) {
      title
      description
      imgUrl
      author {
        username
      }
    }
  }
`;

const MY_POSTS = gql`
  query ($id: String!) {
    myPosts(id: $id) {
      imgUrl
      _id
    }
  }
`;

const SAVED_POSTS = gql`
  query ($id: String!) {
    savedPosts(id: $id) {
      savedPins {
        title
        description
        imgUrl
        _id
        author {
          username
        }
      }
    }
  }
`;

export { GET_ALL_POSTS, SINGLE_POST, MY_POSTS, SAVED_POSTS };
