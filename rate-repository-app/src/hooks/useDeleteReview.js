import { DELETE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

export const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    const { data } = await mutate({
      variables: { deleteReviewId: id },
    });
    return data;
  };
  return [deleteReview, result];
};
