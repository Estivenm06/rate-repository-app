import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_REPOSITORIES } from "./graphql/queries";

export const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });
  console.log(data);

  const fetchRepositories = () => {
    if(!loading){
      setRepositories(data.repositories)
    }
  }

  useEffect(() => {
    fetchRepositories()
  }, [data])

  return { repositories, error };
};
