import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

export const useRepositories = (sorting, searchQuery) => {
  let variables = {};

  if (sorting == "latest") {
    variables = { orderBy: "CREATED_AT", orderDirection: "DESC", searchKeyword: searchQuery };
  }
  if (sorting == "highest") {
    variables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC", searchKeyword: searchQuery };
  }
  if (sorting == "lowest") {
    variables = { orderBy: "RATING_AVERAGE", orderDirection: "ASC", searchKeyword: searchQuery };
  }

  const { data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const refetchRepositories = () => {
    refetch();
  };

  return {
    repositories: data ? data.repositories : undefined,
    refetchRepositories,
  };
};
