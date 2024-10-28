import React from "react";
import Main from "./src/Main";
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import { createApolloClient } from "./src/utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import Constants from "expo-constants";
import { AuthStorage } from "./src/utils/authStorage";
import { AuthStorageContext } from "./src/contexts/AuthStorageContext";
const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  console.log(Constants.expoConfig);
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
      <StatusBar style="auto" />
    </NativeRouter>
  );
}
