/* eslint-disable react/prop-types */
import React from "react";
import Text from "./Text";
import { View, Pressable, TextInput, StyleSheet } from "react-native";
import { useFormik } from "formik";
import { theme } from "../themes";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    padding: "1em",
    gap: "0.5em",
  },
  input: {
    padding: "0.5em",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: "0.2em",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: "0.5em",
    borderRadius: "0.2em",
  },
});

export const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={"gray"}
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"gray"}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={{ textAlign: "center", color: "white" }}>Sign in</Text>
      </Pressable>
    </View>
  );
};
