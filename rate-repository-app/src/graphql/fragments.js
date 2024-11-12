import { gql } from "@apollo/client";

export const CORE_NODE_REPOSITORIES = gql`
  fragment coreRepositories on RepositoryConnection {
    totalCount
    edges {
      node {
        id
        createdAt
        description
        forksCount
        fullName
        language
        name
        openIssuesCount
        ownerAvatarUrl
        ownerName
        ratingAverage
        reviewCount
        stargazersCount
        url
        userHasReviewed
        watchersCount
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
`;

export const CORE_REVIEW_REPOSITORY = gql`
  fragment reviewConnection on ReviewConnection {
    edges {
      node {
        id
        createdAt
        rating
        repositoryId
        text
        user{
        id
        username
        }
        userId
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    totalCount
  }
`;
