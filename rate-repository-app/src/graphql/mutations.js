import { gql } from "@apollo/client";

export const ACCESS_USER = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
     authenticate (credentials: $credentials) {
      accessToken
    }
  }
`;
