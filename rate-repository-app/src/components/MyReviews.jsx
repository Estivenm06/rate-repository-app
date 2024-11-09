/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { CHECK_USER } from "../graphql/queries";
import { ReviewItem } from "./SingleRepository";
import { Pressable, View, StyleSheet, Alert } from "react-native";
import { theme } from "../themes";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { useDeleteReview } from "../hooks/useDeleteReview";

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    paddingBottom: 20,
    gap: 20,
    justifyContent: "center",
  },
  buttonView: {
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  buttonDelete: {
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
    backgroundColor: theme.colors.errorColor,
  },
});

const ShowReviews = ({ reviews, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  if (!reviews) {
    return null;
  }

  const onPress = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteReview(id);
            refetch();
          },
        },
      ]
    );
  };
  return (
    <>
      {reviews.map((r) => {
        return (
          <View key={r.id}>
            <ReviewItem review={r} />
            <View style={style.container}>
              <View>
                <Pressable
                  style={style.buttonView}
                  onPress={() =>
                    navigate(`/${r.id.substring(r.user.id.length + 1)}`)
                  }
                >
                  <Text style={{ color: "white" }} fontWeight={"bold"}>
                    View repository
                  </Text>
                </Pressable>
              </View>
              <View>
                <Pressable
                  style={style.buttonDelete}
                  onPress={() => onPress(r.id)}
                >
                  <Text style={{ color: "white" }} fontWeight={"bold"}>
                    Delete review
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
};

export const MyReviews = () => {
  const [reviews, setReviews] = useState();
  const { data, refetch } = useQuery(CHECK_USER, {
    nextFetchPolicy: "cache-first",
    variables: { includeReviews: true },
  });
  useEffect(() => {
    const checkUser = () => {
      if (data) {
        refetch()
        setReviews(data.me.reviews.edges);
      }
    };
    checkUser();
  }, [data]);

  return (
    <>
      {reviews ? (
        <ShowReviews reviews={reviews.map((r) => r.node)} refetch={refetch} />
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};
