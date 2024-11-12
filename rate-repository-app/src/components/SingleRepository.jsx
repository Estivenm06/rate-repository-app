/* eslint-disable react/prop-types */
import { RepositoryItem } from "./RepositoryItem";
import { useParams } from "react-router-native";
import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";
import Text from "./Text";
import { theme } from "../themes";
import * as Linking from "expo-linking";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { useSingleRepository } from "../hooks/useSingleRepository";

const style = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    padding: 15,
    gap: 10,
    marginTop: 10,
    flexDirection: "row",
  },
  body: {
    flexDirection: "column",
    flexShrink: 1,
    gap: 2,
  },
  containerButton: {
    backgroundColor: "white",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  roundShape: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: 50,
    height: 60,
    width: 60,
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
          <Text
            style={{ color: "white", textAlign: "center" }}
            fontWeight={"bold"}
          >
            Open in GitHub
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const ReviewItem = ({ review }) => {
  const Date = () => (
    <Text color={"textSecondary"}>
      {format(parseISO(review.createdAt), "dd.MM.yyyy")}
    </Text>
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
          <Text fontWeight={"bold"} fontSize={"subheading"}>
            {review.user.username}
          </Text>
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
  const [review, setReview] = useState();
  const { repository, fetchMore } = useSingleRepository({ id, first: 4 });

  useEffect(() => {
    if (repository) {
      setReview(repository?.reviews.edges);
    }
  }, [repository]);

  const endReached = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={review}
      renderItem={({ item }) => (
        <ReviewItem review={item.node} key={(item) => item.node.id} />
      )}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={endReached}
      onEndReachedThreshold={0.5}
    />
  );
};
