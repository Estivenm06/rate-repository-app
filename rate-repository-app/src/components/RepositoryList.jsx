/* eslint-disable react/prop-types */
import React from "react";
import { FlatList, StyleSheet, View, Pressable } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const itemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate()

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={itemSeparator}
      renderItem={({ item }) => {
        return(
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem item={item} keyExtractor={(item) => item.id} />
          </Pressable>
        )
      }
      }
    />
  );
};

export const RepositoryList = ({repositories}) => {
  return <RepositoryListContainer repositories={repositories} />;
};
