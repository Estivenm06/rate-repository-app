/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { theme } from "../themes";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    padding: "1em",
    gap: "20px",
  },
  top: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  author: {
    width: 50,
    height: 50,
    borderRadius: "0.5em",
  },
  texts: {
    paddingLeft: "1em",
    flexDirection: "column",
    flexGrow: 0,
    flexShrink: 1,
    gap: "5px",
  },
  textLanguage: {
    backgroundColor: theme.colors.primary,
    borderRadius: "0.2em",
    padding: "0.5em",
    width: "fit-content",
  },
});

// eslint-disable-next-line react/prop-types
const RepositoryItemTop = ({
  fullname,
  description,
  language,
  ownerAvatarUrl,
}) => {
  return (
    <>
      <View style={styles.top}>
        <Image style={styles.author} source={{ uri: `${ownerAvatarUrl}` }} />

        <View style={styles.texts}>
          <View style={styles.name}>
            <Text fontWeight={"bold"} fontSize={"subheading"}>
              {fullname}
            </Text>
          </View>
          <View style={styles.description}>
            <Text>{description}</Text>
          </View>
          <View style={styles.textLanguage}>
            <Text style={{ color: "white" }}>{language}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

// eslint-disable-next-line react/prop-types
const RepositoryItemBottom = ({
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
}) => {
  return (
    <>
      <View style={styles.bottom}>
        <View>
          <Text>
            {stargazersCount >= 1000 ? (
              <Text fontWeight={"bold"} style={{ margin: "auto" }}>{`${(
                stargazersCount / 1000
              ).toFixed(1)}k`}</Text>
            ) : (
              <Text fontWeight={"bold"} style={{ margin: "auto" }}>
                {stargazersCount}
              </Text>
            )}{" "}
          </Text>

          <Text>Stars</Text>
        </View>
        <View>
          <Text>
            {forksCount >= 1000 ? (
              <Text fontWeight={"bold"} style={{ margin: "auto" }}>{`${(
                forksCount / 1000
              ).toFixed(1)}k`}</Text>
            ) : (
              <Text fontWeight={"bold"} style={{ margin: "auto" }}>
                {forksCount}
              </Text>
            )}{" "}
          </Text>
          <Text>Forks</Text>
        </View>
        <View>
          <Text fontWeight={"bold"} style={{ margin: "auto" }}>
            {reviewCount}
          </Text>
          <Text>Review</Text>
        </View>
        <View>
          <Text fontWeight={"bold"} style={{ margin: "auto" }}>
            {ratingAverage}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
    </>
  );
};

export const RepositoryItem = (item) => {
  return (
    <View style={styles.container}>
      <RepositoryItemTop
        fullname={item.item.fullName}
        description={item.item.description}
        language={item.item.language}
        ownerAvatarUrl={item.item.ownerAvatarUrl}
      />
      <RepositoryItemBottom
        stargazersCount={item.item.stargazersCount}
        forksCount={item.item.forksCount}
        reviewCount={item.item.reviewCount}
        ratingAverage={item.item.ratingAverage}
      />
    </View>
  );
};
