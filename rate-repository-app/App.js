import React from "react";
import Main from "./src/Main";
import { NativeRouter } from "react-router-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <NativeRouter>
      <Main />
      </NativeRouter>
      <StatusBar style="auto"/>
    </>
  );
}
