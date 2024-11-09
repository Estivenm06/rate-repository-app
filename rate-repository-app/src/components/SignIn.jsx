import React from "react";
import Text from "./Text";
import { View, Pressable, TextInput, StyleSheet } from "react-native";
import { useFormik } from "formik";
import { theme } from "../themes";
import * as yup from "yup";
import { useSignIn } from "../hooks/useSign";
import { useNavigate } from "react-router-native";
import { AuthStorage } from "../utils/authStorage";
import { useApolloClient } from "@apollo/client";

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    padding: 20,
    gap: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  inputError: {
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.errorColor,
    borderRadius: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate();
  const authStorage = new AuthStorage();
  const apolloClient = useApolloClient();
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      navigate("/");
      return data;
    } catch (e) {
      console.log(e);
    }
  };
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
