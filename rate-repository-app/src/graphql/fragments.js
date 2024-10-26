import { gql } from "@apollo/client";

export const CORE_NODE_REPOSITORIES = gql`
  fragment coreRepositories on RepositoryConnection {
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
    }
  }
`;
