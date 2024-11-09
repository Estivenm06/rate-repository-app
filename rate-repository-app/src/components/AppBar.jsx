/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import { theme } from "../themes";
import { Link, useNavigate } from "react-router-native";
import { AuthStorage } from "../utils/authStorage";
import { useApolloClient, useQuery } from "@apollo/client";
import { CHECK_USER } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },
  navBar: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  navItemA: {
    color: "white",
    padding: 5,
  },
  navItemB: {
    color: "white",
    padding: 5,
    margin: "auto",
    marginLeft: 10
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
  const [logout] = useLogout();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { data } = useQuery(CHECK_USER);

  useEffect(() => {
    const checkUser = () => {
      data ? setUser(data.me) : setUser(null);
    };
    checkUser();
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.navBar}>
          <Pressable onPress={() => navigate('/')}>
            <Text style={styles.navItemA} fontSize={"subheading"}>
              Repositories
            </Text>
          </Pressable>
          {user ? (
            <>
              <Pressable onPress={() => navigate("/review")}>
                <Text style={styles.navItemB}>Create a review</Text>
              </Pressable>
              <Pressable onPress={() => navigate('/myReviews')}>
                <Text style={styles.navItemB}>My reviews</Text>
              </Pressable>
              <Pressable onPress={() => logout()}>
                <Text style={styles.navItemB}>Sign out</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Link to="/login">
                <Text style={styles.navItemB}>Sign in</Text>
              </Link>
              <Link to="/signUp">
                <Text style={styles.navItemB}>Sign up</Text>
              </Link>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
