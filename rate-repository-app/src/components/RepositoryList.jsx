/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FlatList, StyleSheet, View, Pressable } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import { Button, Menu, Divider } from "react-native-paper";
import { useRepositories } from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const itemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  refetchRepositories,
  setSorting,
  name,
  setName,
}) => {
  const navigate = useNavigate();

  const repos = repositories ? repositories.edges : [];

  return (
    <FlatList
      data={repos}
      ListHeaderComponent={() => (
        <HeaderList
          refetchRepositories={refetchRepositories}
          setSorting={setSorting}
          name={name}
          setName={setName}
        />
      )}
      renderItem={({ item }) => {
        return (
          <Pressable onPress={() => navigate(`/${item.node.id}`)}>
            <RepositoryItem
              item={item.node}
              keyExtractor={(item) => item.node.id}
            />
          </Pressable>
        );
      }}
      ItemSeparatorComponent={itemSeparator}
    />
  );
};

export const HeaderList = ({
  refetchRepositories,
  setSorting,
  name,
  setName,
}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{name}</Button>}
      >
        <Menu.Item
          onPress={() => {
            setName("Latest repositories");
            setSorting("latest");
            refetchRepositories();
          }}
          title="Latest repositories"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            setName("Highest rated repositories");
            setSorting("highest");
            refetchRepositories();
          }}
          title="Highest rated repositories"
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            setName("Lowest rated repositories");
            setSorting("lowest");
            refetchRepositories();
          }}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

export const RepositoryList = () => {
  const [sorting, setSorting] = useState("latest");
  const [name, setName] = useState("Latest repositories");
  const { repositories, refetchRepositories } = useRepositories(sorting);
  return (
    <RepositoryListContainer
      repositories={repositories}
      refetchRepositories={refetchRepositories}
      setSorting={setSorting}
      name={name}
      setName={setName}
    />
  );
};
