import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const createAnReview = async ({ ownerName, rating, repositoryName, review }) => {
    const { data } = await mutate({
      variables: { review: { ownerName, rating, repositoryName, text: review } },
    });
    return data;
  };
  return [createAnReview, result];
};
