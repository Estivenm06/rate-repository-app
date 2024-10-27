import { gql } from "@apollo/client";
import { Authentication } from "./fragments";

export const ACCESS_USER = gql`
  ${Authentication}

  mutation Authenticate($credentials: AuthenticateInput!) {
     authenticate (credentials: $credentials) {
      ...Authentication_Mutation
    }
  }
`;
