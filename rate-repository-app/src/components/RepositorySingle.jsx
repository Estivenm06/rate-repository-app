/* eslint-disable react/prop-types */
import { RepositoryItem } from "./RepositoryItem";
import { useParams } from "react-router-native";
import React from "react";
import { View, StyleSheet, Pressable } from "react-native-web";
import Text from "./Text";
import { theme } from "../themes";
import * as Linking from 'expo-linking'

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: "0.2em",
    padding: "0.5em",
    marginBottom: "0.7em",
    width: "80%",
    margin: "auto"
},
});

export const RepositorySingle = ({ repositories }) => {
  const { id } = useParams();
  const repositoryAll = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];
  const repo = repositoryAll.find((r) => r.id === id);
  return (
    <View style={style.container}>
      <RepositoryItem item={repo} keyExtractor={(item) => item.id} />
      <View style={style.button}>
        <Pressable onPress={() => Linking.openURL(repo.url)}><Text style={{color: 'white', textAlign: "center"}}>Open in Github</Text></Pressable>
      </View>
    </View>
  );
};
