/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { View } from "react-native-web";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";
import { SignIn } from "../components/SignIn";

const RepositoryItem = ({repositories}) => {
  return (
    <View testID="repositoryItem">
      <RepositoryListContainer repositories={repositories}/>
    </View>
  )
}

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders reopsitory inforamtion correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryItem repositories={repositories}/>);
      screen.debug();

      const repositoryItem = screen.getAllByTestId("repositoryItem");
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItem;

      //first
      expect(firstRepositoryItem).toHaveTextContent("jaredpalmer/formik");
      expect(firstRepositoryItem).toHaveTextContent(
        "Build forms in React, without the tears"
      );
      expect(firstRepositoryItem).toHaveTextContent("TypeScript");
      expect(firstRepositoryItem).toHaveTextContent("1.6k");
      expect(firstRepositoryItem).toHaveTextContent("21.9k");
      expect(firstRepositoryItem).toHaveTextContent(3);

      //second
      expect(secondRepositoryItem).toHaveTextContent(
        "async-library/react-async"
      );
      expect(secondRepositoryItem).toHaveTextContent(
        "Flexible promise-based React data loader"
      );
      expect(secondRepositoryItem).toHaveTextContent("JavaScript");
      expect(secondRepositoryItem).toHaveTextContent(69);
      expect(secondRepositoryItem).toHaveTextContent("1.8k");
      expect(secondRepositoryItem).toHaveTextContent(3);
    });
  });
});

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      render(<SignIn onSubmit={onSubmit} />);
      const usernameInput = screen.getByPlaceholderText("Username");
      const passwordInput = screen.getByPlaceholderText("Password");
      const submitButton = screen.getByText("Sign in");
      fireEvent.changeText(usernameInput, "kalle");
      fireEvent.changeText(passwordInput, "password");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
