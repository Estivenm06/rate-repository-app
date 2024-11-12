/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FlatList, StyleSheet, View, Pressable } from "react-native";
import { RepositoryItem } from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import { Button, Menu, Divider, Searchbar } from "react-native-paper";
import { useRepositories } from "../hooks/useRepositories";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  search: {
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
  },
  options: {
    flexDirection: "row",
    padding: 10,
    alignContent: "flex-start",
  },
});

const itemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <RepositoryListHeader
        search={props.search}
        setSearch={props.setSearch}
        setName={props.setName}
        refetchRepositories={props.refetchRepositories}
        setSorting={props.setSorting}
        name={props.name}
      />
    );
  };

  render() {
    const props = this.props;
    const repos = props.repositories ? props.repositories.edges : [];
    return (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={repos}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => props.navigate(`/${item.node.id}`)}>
              <RepositoryItem
                item={item.node}
                keyExtractor={(item) => item.node.id}
              />
            </Pressable>
          );
        }}
        ItemSeparatorComponent={itemSeparator}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryListHeader = ({
  setSearch,
  search,
  setName,
  setSorting,
  refetchRepositories,
  name,
}) => {
  const [visible, setVisible] = useState(false);
  const onSearch = (query) => setSearch(query);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Searchbar
        style={styles.search}
        placeholder="Search"
        onChangeText={onSearch}
        value={search}
      />
      <View style={styles.options}>
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
    </View>
  );
};

export const RepositoryList = () => {
  const [sorting, setSorting] = useState("latest");
  const [name, setName] = useState("Latest repositories");
  const [search, setSearch] = useState("");
  const [searchQueryDebounced] = useDebounce(search, 500);
  const { repositories, refetchRepositories, fetchMore } = useRepositories({
    first: 5,
    sorting,
    searchQueryDebounced,
  });

  const navigate = useNavigate();
  const onEndReach = () => {
    fetchMore();
  };
  return (
    <RepositoryListContainer
      repositories={repositories}
      refetchRepositories={refetchRepositories}
      setSorting={setSorting}
      name={name}
      setName={setName}
      search={search}
      setSearch={setSearch}
      navigate={navigate}
      onEndReach={onEndReach}
    />
  );
};
