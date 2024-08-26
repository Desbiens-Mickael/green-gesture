import { gql } from "@apollo/client/core";
import client from "./apolloClient";
import db from "../../server/src/db";
import User from "../../server/src/entity/User";

const createUserMutation = gql`
  mutation CreateUser($data: UserInputSubscribe!) {
    createUser(data: $data) {
      id
      firstName
      lastName
      email
      subscriptionType
    }
  }
`;

const getUserByIdQuery = gql`
  query GetUserById($id: Int!) {
    getUserById(id: $id) {
      id
      firstName
    }
  }
`;

describe("User Resolver", () => {
  describe("createUser", () => {
    it("should create a user", async () => {
      const res = await client.mutate({
        mutation: createUserMutation,
        variables: {
          data: {
            firstName: "User",
            lastName: "Partner",
            email: "partner@gmail.com",
            password: "testtest",
            subscriptionType: "partner",
          },
        },
      });
      expect(res.data.createUser).toHaveProperty("id");
      expect(res.data.createUser).toHaveProperty("firstName", "User");
      expect(res.data.createUser).toHaveProperty("lastName", "Partner");
      expect(res.data.createUser).toHaveProperty("email", "partner@gmail.com");
      expect(res.data.createUser).toHaveProperty("subscriptionType", "partner");
    });

    it("should not create wilder given invalid attributes and return an error", async () => {
      expect(() =>
        client.mutate({
          mutation: createUserMutation,
          variables: {
            data: {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              subscriptionType: "",
            },
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Argument Validation Error"`
      );
    });
  });

  describe("get user by id", () => {
    it("should get a user by id", async () => {
      const user = await db.getRepository(User).save({
        firstName: "User",
        lastName: "Partner",
        email: "user1@gmail.com",
        password: "testtest",
        subscriptionType: "partner",
      });

      const res = await client.query({
        query: getUserByIdQuery,
        variables: {
          id: user.id,
        },
        fetchPolicy: "no-cache",
      });

      expect(res.data.getUserById).toHaveProperty("id", user.id);
      expect(res.data.getUserById).toHaveProperty("firstName", user.firstName);
    });
  });
});
