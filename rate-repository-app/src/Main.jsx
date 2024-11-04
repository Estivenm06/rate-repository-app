import React from "react";
import { StyleSheet, View } from "react-native";
import { RepositoryList } from "./components/RepositoryList";
import { AppBar } from "./components/AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import { theme } from "./themes";
import { SignIn } from "./components/SignIn";
import { SingleRepository } from "./components/SingleRepository";
import { Review } from "./components/Review";
import { SignUp } from "./components/SignUp";
import { PaperProvider } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <>
    <PaperProvider>
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route
            path="/"
            element={<RepositoryList />}
          />
          <Route path="/:id" element={<SingleRepository />} />
          <Route path="/review" element={<Review />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Routes>
      </View>
    </PaperProvider>
    </>
  );
};
export default Main;
