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

const GET_MY_POSTS = gql`
  query ($authorId: String!) {
    getMyPosts(authorId: $authorId) {
      imgUrl
      _id
    }
  }
`;

export { GET_ALL_POSTS, GET_MY_POSTS };
