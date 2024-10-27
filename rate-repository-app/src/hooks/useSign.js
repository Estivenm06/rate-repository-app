import { useMutation } from "@apollo/client";
import { ACCESS_USER } from "../graphql/mutations";

export const useSignIn = () => {
  const [mutate, result] = useMutation(ACCESS_USER);

  const signIn = async ({ username, password }) => {
    const {data} = await mutate({ variables: { credentials: { username, password} } });
    return data
  };

  return [signIn, result];
};