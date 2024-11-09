import { gql } from "@apollo/client";

export const ACCESS_USER = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation Review($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      createdAt
      rating
      text
      user {
        id
        username
      }
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CREATEUSER($user: CreateUserInput){
    createUser(user: $user){
      id
      createdAt
      reviewCount
      username
    }
  }
`
export const DELETE_REVIEW = gql`
  mutation DELETE($deleteReviewId: ID!){
    deleteReview(id: $deleteReviewId)
  }
`