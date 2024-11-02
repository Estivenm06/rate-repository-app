/* eslint-disable react/prop-types */
import { RepositoryItem } from "./RepositoryItem";
import { useParams } from "react-router-native";
import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native-web";
import Text from "./Text";
import { theme } from "../themes";
import * as Linking from "expo-linking";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { format, parseISO } from "date-fns";

const style = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    padding: "1em",
    gap: "15px",
    marginTop: 10,
    flexDirection: "row"
  },
  body: {
    flexDirection: "column",
    flexShrink: 1,
    gap: "5px"
  },
  containerButton: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: "0.2em",
    padding: "0.5em",
    marginBottom: "0.7em",
    width: "80%",
    margin: "auto",
  },
  roundShape: {
    border: "2px solid",
    color: theme.colors.primary,
    borderRadius: "2em",
    width: "3em",
    height: "3em",
  },
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} keyExtractor={({ id }) => id} />
      <View style={style.containerButton}>
        <Pressable
          style={style.button}
          onPress={() => Linking.openURL(repository.url)}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Open in Github
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const ReviewItem = ({ review }) => {
  if (!review) {
    return null;
  }

  const Date = () => (
    <Text color={'textSecondary'}>{format(parseISO(review.createdAt), "dd.MM.yyyy")}</Text>
  );

  return (
    <View style={style.container}>
      <View style={style.roundShape}>
        <Text
          style={{ margin: "auto" }}
          color={"primary"}
          fontWeight={"bold"}
          fontSize={"subheading"}
        >
          {review.rating}
        </Text>
      </View>
      <View style={style.body}>
        <View>
          <Text fontWeight={"bold"} fontSize={'subheading'}>{review.user.username}</Text>
        </View>
        <View>
          <Date />
        </View>
        <View>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export const SingleRepository = () => {
  const { id } = useParams();
  const [repository, setRepository] = useState();
  const [review, setreview] = useState();
  const { data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
  });

  useEffect(() => {
    if (data) {
      setRepository(data.repository);
      setreview(data.repository.reviews);
    }
  }, [data]);

  const reviewSingle = review ? review.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewSingle}
      renderItem={({ item }) => {
        return <ReviewItem review={item} />;
      }}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};
