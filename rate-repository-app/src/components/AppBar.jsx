import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import { theme } from "../themes";
import { Link, useNavigate } from "react-router-native";
import { AuthStorage } from "../utils/authStorage";
import { CHECK_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

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

const useLogout = () => {
  const authStorage = new AuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };
  return [logout];
};

export const AppBar = () => {
  const [user, setUser] = useState(null);
  const [logout] = useLogout();
  const { data, loading } = useQuery(CHECK_USER);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      if (data) {
        setUser(data.me);
      }
    };
    checkUser();
  }, [data, loading]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.navBar}>
          <Pressable>
            <Text style={styles.navItemA} fontSize={"subheading"}>
              Repositories
            </Text>
          </Pressable>
          {user ? (
            <>
              <Pressable onPress={() => navigate("/review")}>
                <Text style={styles.navItemB}>Create a review</Text>
              </Pressable>
              <Pressable onPress={() => logout()}>
                <Text style={styles.navItemB}>Log out</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Link to='/signUp'>
                <Text style={styles.navItemB}>Sign Up</Text>
              </Link>
              <Link to="/login">
                <Text style={styles.navItemB}>Sign in</Text>
              </Link>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
