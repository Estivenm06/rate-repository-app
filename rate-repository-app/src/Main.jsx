import React from "react";
import { StyleSheet, View } from "react-native";
import { RepositoryList } from "./components/RepositoryList";
import { AppBar } from "./components/AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import { theme } from "./themes";
import { SignIn } from "./components/SignIn";
import { useSignIn } from "./hooks/useSign";
import { useNavigate } from "react-router-native";
import { AuthStorage } from "./utils/authStorage";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate()
  const authStorage = new AuthStorage()
  const apolloClient = useApolloClient()

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      await authStorage.setAccessToken(data.authenticate.accessToken)
      apolloClient.resetStore()
      navigate('/')
      return data
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <>
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/login" element={<SignIn onSubmit={onSubmit}/>} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </View>
    </>
  );
};
export default Main;
