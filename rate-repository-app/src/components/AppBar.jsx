import React from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import { theme } from "../themes";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },
  navBar: {
    display: "flex",
    flexDirection: "row",
  },
  navItemA: {
    color: "white",
    padding: "1em",
  },
  navItemB: {
    color: "white",
    padding: "1em",
    margin: "auto",
  },
});

export const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.navBar}>
          <Pressable>
            <Text style={styles.navItemA} fontSize={"subheading"}>
              Repositories
            </Text>
          </Pressable>
          <Link to="/login">
            <Text style={styles.navItemB}>Sign in</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};
