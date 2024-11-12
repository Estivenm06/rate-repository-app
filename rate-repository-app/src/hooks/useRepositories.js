import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

export const useRepositories = ({sorting, searchQuery, first}) => {
  let variables = {};

  if (sorting == "latest") {
    variables = {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
      searchKeyword: searchQuery,
      first,
    };
  }
  if (sorting == "highest") {
    variables = {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
      searchKeyword: searchQuery,
      first,
    };
  }
  if (sorting == "lowest") {
    variables = {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
      searchKeyword: searchQuery,
      first,
    };
  }

  const { data, loading, fetchMore, refetch, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const refetchRepositories = () => {
    refetch();
  };

  return {
    repositories: data?.repositories,
    refetchRepositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};
