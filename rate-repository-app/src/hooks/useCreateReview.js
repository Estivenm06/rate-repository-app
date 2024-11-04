import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createAnReview = async ({ ownerName, rating, repositoryName, text }) => {
    const { data } = await mutate({
      variables: { review: { ownerName, rating, repositoryName, text } },
    });
    return data;
  };
  return [createAnReview, result];
};
