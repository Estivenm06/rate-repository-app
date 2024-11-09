import React from "react";
import * as yup from "yup";
import Text from "./Text";
import { theme } from "../themes";
import { useFormik } from "formik";
import { View, Pressable, TextInput, StyleSheet } from "react-native";
import { useCreateReview } from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  review: "",
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    padding: 20,
    gap: 15,
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
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required()
    .positive()
    .min(0)
    .max(100)
    .required("Rating is required"),
  review: yup.string().optional(),
});

export const CreateReview = () => {
  const [createAnReview] = useCreateReview();
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;
    const r = Number(rating);
    try {
      const { createReview } = await createAnReview({
        ownerName,
        repositoryName,
        rating: r,
        review,
      });
      navigate(`/${createReview.repositoryId}`);
      return createReview;
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
      {/*OWNER NAME*/}
      {formik.touched.ownerName && formik.errors.ownerName ? (
        <>
          <TextInput
            style={styles.inputError}
            placeholder="Repository owner Name"
            value={formik.values.ownerName}
            placeholderTextColor={"gray"}
            onChangeText={formik.handleChange("ownerName")}
          />
          <Text style={{ color: theme.colors.errorColor }}>
            {formik.errors.ownerName}
          </Text>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Repository owner Name"
            value={formik.values.ownerName}
            placeholderTextColor={"gray"}
            onChangeText={formik.handleChange("ownerName")}
          />
        </>
      )}
      {/*REPOSITORY NAME*/}
      {formik.touched.repositoryName && formik.errors.repositoryName ? (
        <>
          <TextInput
            style={styles.inputError}
            placeholder="Repository name"
            placeholderTextColor={"gray"}
            value={formik.values.repositoryName}
            onChangeText={formik.handleChange("repositoryName")}
          />
          <Text style={{ color: theme.colors.errorColor }}>
            {formik.errors.repositoryName}
          </Text>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Repository name"
            placeholderTextColor={"gray"}
            value={formik.values.repositoryName}
            onChangeText={formik.handleChange("repositoryName")}
          />
        </>
      )}
      {/*RATING*/}
      {formik.touched.rating && formik.errors.rating ? (
        <>
          <TextInput
            style={styles.inputError}
            value={formik.values.rating}
            placeholder="Rating between 0 and 100"
            placeholderTextColor={"gray"}
            onChangeText={formik.handleChange("rating")}
          />
          <Text style={{ color: theme.colors.errorColor }}>
            {formik.errors.rating}
          </Text>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={formik.values.rating}
            placeholder="Rating between 0 and 100"
            placeholderTextColor={"gray"}
            onChangeText={formik.handleChange("rating")}
          />
        </>
      )}
      {/*TEXT*/}
      <>
        <TextInput
          style={styles.input}
          value={formik.values.review}
          placeholder="Review"
          placeholderTextColor={"gray"}
          onChangeText={formik.handleChange("review")}
          multiline
        />
      </>
      {/*BUTTON*/}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={{ textAlign: "center", color: "white" }}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};
