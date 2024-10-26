import { gql } from "@apollo/client";
import { CORE_NODE_REPOSITORIES } from "./fragments";

export const GET_REPOSITORIES = gql`
  ${CORE_NODE_REPOSITORIES}
  query {
    repositories {
      ...coreRepositories
    }
  }
`;
