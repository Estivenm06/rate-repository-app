import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import Text from "./Text";
import { theme } from "../themes";
import { useSignUp } from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";

const style = StyleSheet.create({
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

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required").min(5).max(30),
  password: yup.string().required("Password is required").min(5).max(50),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirmation is required"),
});

export const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values;
    const {data} = await signUp({username, password})
    navigate('/')
    return data
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={style.container}>
      {/*USERNAME*/}
      {formik.touched.username && formik.errors.username ? (
        <>
          <TextInput
            style={style.inputError}
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange("username")}
            placeholderTextColor={"gray"}
          />
          <Text style={{ color: theme.colors.errorColor }}>
            {formik.errors.username}
          </Text>
        </>
      ) : (
        <TextInput
          style={style.input}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          placeholderTextColor={"gray"}
        />
      )}
      {/*PASSWORD*/}
      {formik.touched.password && formik.errors.password ? (
        <>
          <TextInput
            secureTextEntry
            style={style.inputError}
            placeholder="password"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            placeholderTextColor={"gray"}
          />
          <Text style={{ color: theme.colors.errorColor }}>
            {formik.errors.password}
          </Text>
        </>
      ) : (
        <TextInput
          secureTextEntry
          style={style.input}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          placeholderTextColor={"gray"}
        />
      )}
      {/*PASSORD CONFIRM*/}
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
        <>
          <TextInput
            secureTextEntry
            style={style.inputError}
            placeholder="Password confirmation"
            value={formik.values.passwordConfirm}
            onChangeText={formik.handleChange("passwordConfirm")}
            placeholderTextColor={"gray"}
          />
          <Text style={{ color: theme.colors.errorColor }}>
            {formik.errors.passwordConfirm}
          </Text>
        </>
      ) : (
        <TextInput
          secureTextEntry
          style={style.input}
          placeholder="passwordConfirm"
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange("passwordConfirm")}
          placeholderTextColor={"gray"}
        />
      )}
      {/*BUTTON*/}
      <Pressable style={style.button} onPress={formik.handleSubmit}>
        <Text style={{ color: "white", textAlign: "center" }}>Sign up</Text>
      </Pressable>
    </View>
  );
};
