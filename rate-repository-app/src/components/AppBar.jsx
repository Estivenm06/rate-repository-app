import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Constants from "expo-constants";
import { theme } from "../themes";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimay,
    display: "flex",
    justifyContent: "flex-end",
  },
  navBar: {
    color: "white",
    padding: "1em",
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontsWeights.normal,
  },
});

export const AppBar = () => {
  return (
    <View style={styles.container}>
      <View>
        <Pressable>
          <Text style={styles.navBar}>Repositories</Text>
        </Pressable>
      </View>
    </View>
  );
};
