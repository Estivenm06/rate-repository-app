import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

export const useRepositories = (sorting) => {
  let variables = {};

  if (sorting == "latest") {
    variables = { orderBy: "CREATED_AT", orderDirection: "DESC" };
  }
  if (sorting == "highest") {
    variables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
  }
  if (sorting == "lowest") {
    variables = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
  }

  const { data, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
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
