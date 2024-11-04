import { gql } from "@apollo/client";
import { CORE_NODE_REPOSITORIES } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${CORE_NODE_REPOSITORIES}
  query GetAll($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!){
    repositories (orderBy: $orderBy, orderDirection: $orderDirection){
      ...coreRepositories
    }
  }
`;

export const CHECK_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
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
