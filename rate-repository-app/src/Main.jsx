import React from "react";
import { StyleSheet, View } from "react-native";
import { RepositoryList } from "./components/RepositoryList";
import { AppBar } from "./components/AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import { theme } from "./themes";
import { SignIn } from "./components/SignIn";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/login" element={<SignIn onSubmit={onSubmit} />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </View>
    </>
  );
};
export default Main;
