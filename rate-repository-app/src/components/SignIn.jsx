/* eslint-disable react/prop-types */
import React from "react";
import Text from "./Text";
import { View, Pressable, TextInput, StyleSheet } from "react-native";
import { useFormik } from "formik";
import { theme } from "../themes";
import * as yup from "yup";

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
  inputError: {
    padding: "0.5em",
    borderWidth: 1,
    borderColor: theme.colors.errorColor,
    borderRadius: "0.2em",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: "0.5em",
    borderRadius: "0.2em",
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.container}>
      {/*USERNAME*/}
      {formik.touched.username && formik.errors.username ? (
        <>
          <TextInput
            style={styles.inputError}
            placeholder="Username"
            placeholderTextColor={"gray"}
            value={formik.values.username}
            onChangeText={formik.handleChange("username")}
          />
          <Text style={{ color: theme.colors.errorColor }}>
            {formik.errors.username}
          </Text>
        </>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={"gray"}
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
        />
      )}
      {/*PASSWORD*/}
      {formik.touched.password && formik.errors.password ? (
        <>
          <TextInput
            style={styles.inputError}
            placeholder="Password"
            placeholderTextColor={"gray"}
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            secureTextEntry
          />
          <Text style={{ color: theme.colors.errorColor }}>
            {formik.errors.password}
          </Text>
        </>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"gray"}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          secureTextEntry
        />
      )}
      {/*BUTTON*/}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={{ textAlign: "center", color: "white" }}>Sign in</Text>
      </Pressable>
    </View>
  );
};
