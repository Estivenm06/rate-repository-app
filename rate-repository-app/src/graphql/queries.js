import { gql } from "@apollo/client";
import { CORE_NODE_REPOSITORIES } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${CORE_NODE_REPOSITORIES}
  query GetAll(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      ...coreRepositories
    }
  }
`;

export const CHECK_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            createdAt
            rating
            text
            user {
              id
              username
            }
            userId
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      ownerAvatarUrl
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      ownerName
      language
      url
      createdAt
      reviews {
        edges {
          node {
            id
            createdAt
            rating
            text
            user {
              id
              username
            }
            userId
          }
        }
      }
    }
  }
`;
