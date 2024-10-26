import React from "react";
import Main from "./src/Main";
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import { createApolloClient } from "./src/utils/apolloClient";
import { ApolloProvider } from "@apollo/client";
import Constants from 'expo-constants'
const apolloClient = createApolloClient();

export default function App() {
  console.log(Constants.expoConfig);
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
