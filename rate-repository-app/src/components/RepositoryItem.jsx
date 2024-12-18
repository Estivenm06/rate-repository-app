/* eslint-disable react/prop-types */
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { theme } from "../themes";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    gap: 20,
    padding: 15
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
    borderRadius: 5,
  },
  texts: {
    paddingLeft: 20,
    flexDirection: "column",
    flexShrink: 1,
    gap: 5,
  },
  textLanguage: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-start'
  },
});

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
          <View>
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

export const RepositoryItem = ({item}) => {
  if(!item){
    return null
  }
  
  return (
    <View style={styles.container} testID="repositoryItem">
      <RepositoryItemTop
        fullname={item.fullName}
        description={item.description}
        language={item.language}
        ownerAvatarUrl={item.ownerAvatarUrl}
      />
      <RepositoryItemBottom
        stargazersCount={item.stargazersCount}
        forksCount={item.forksCount}
        reviewCount={item.reviewCount}
        ratingAverage={item.ratingAverage}
      />
    </View>
  );
};
