import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import { useRepositories } from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const itemSeparator = () => <View style={styles.separator} />;


export const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
    
  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={itemSeparator}
        renderItem={({ item }) => (
          <RepositoryItem item={item} keyExtractor={(item) => item.id} />
        )}
      />
    </>
  );
};
