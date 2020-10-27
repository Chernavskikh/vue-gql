import { gql } from 'apollo-boost';

// Post Queries

export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      description
      imageUrl
    }
  }
`;

// User Queries

// Post Mutations

// User Mutations
