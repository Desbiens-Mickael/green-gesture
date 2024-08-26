import { gql } from "@apollo/client/core";
import client from "./apolloClient";
import db from "../../server/src/db";
import User from "../../server/src/entity/User";
import EcoAction from "../../server/src/entity/EcoAction";
import { getJWTFor, getValidations, getUserAndToken } from "./utils";

const createEcoActionMutation = gql`
  mutation CreateEcoAction($data: EcoActionInputCreation!) {
    createEcoAction(data: $data) {
      id
      name
      description
      author {
        id
        firstName
        lastName
        email
        subscriptionType
        role
        subscriptionId
      }
      validations {
        id
        name
        points
      }
    }
  }
`;

const getEcoActionByIdQuery = gql`
  query GetEcoActionbyId($EcoActionId: Int!) {
    getEcoActionbyId(id: $EcoActionId) {
      name
      description
      validations {
        id
        points
      }
    }
  }
`;

const getFreeEcoActionsQuery = gql`
  query GetFreeEcoActions {
    getFreeEcoActions {
      id
      name
      description
    }
  }
`;

const updateEcoActionMutation = gql`
  mutation UpdateEcoAction(
    $data: EcoActionInputCreation!
    $updateEcoActionId: Int!
  ) {
    updateEcoAction(data: $data, id: $updateEcoActionId) {
      id
      name
      description
      validations {
        id
        name
        points
      }
    }
  }
`;

const deleteEcoActionMutation = gql`
  mutation DeleteEcoAction($ecoActionId: Int!) {
    deleteEcoAction(id: $ecoActionId)
  }
`;

describe("EcoAction Resolver", () => {
  describe("createEcoAction", () => {
    it("Must not create eco-actions with invalid attributes and must return an error", async () => {
      // create a user
      const { token } = await getUserAndToken();

      await expect(() =>
        client.mutate({
          mutation: createEcoActionMutation,
          variables: {
            data: {
              name: "",
              description: "",
              validationIds: [],
            },
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
            fetchPolicy: "no-cache",
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Argument Validation Error"`
      );
    });

    it("should create an eco-action", async () => {
      // create a user
      const { token, userWithoutPassword } = await getUserAndToken();

      const { validationWithTypename, validationIds } = await getValidations();

      const res = await client.mutate({
        mutation: createEcoActionMutation,
        variables: {
          data: {
            name: "EcoAction",
            description: "Description",
            validationIds: validationIds,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
          fetchPolicy: "no-cache",
        },
      });

      expect(res.data.createEcoAction).toHaveProperty("id");
      expect(res.data.createEcoAction).toHaveProperty("name", "EcoAction");
      expect(res.data.createEcoAction).toHaveProperty(
        "description",
        "Description"
      );
      expect(res.data.createEcoAction).toHaveProperty("author", {
        __typename: "User",
        ...userWithoutPassword,
      });
      expect(res.data.createEcoAction).toHaveProperty(
        "validations",
        validationWithTypename
      );
    });
  });

  describe("getEcoActionById", () => {
    it("Must not return an eco-action with invalid attributes and must return an error", async () => {
      // create a user
      const { token } = await getUserAndToken();

      await expect(() =>
        client.query({
          query: getEcoActionByIdQuery,
          variables: {
            EcoActionId: 0,
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
            fetchPolicy: "no-cache",
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"EcoAction introuvable"`);
    });
    it("should return an eco-action", async () => {
      // create a user
      const { token, userWithoutPassword } = await getUserAndToken();

      // create an validation
      const { validations } = await getValidations();

      // create an eco-action
      const ecoAction = await db.getRepository(EcoAction).save({
        name: "EcoAction test",
        description: "Description",
        author: userWithoutPassword,
        validations: validations,
      });

      const res = await client.query({
        query: getEcoActionByIdQuery,
        variables: {
          EcoActionId: ecoAction.id,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
          fetchPolicy: "no-cache",
        },
      });

      expect(res.data.getEcoActionbyId).toHaveProperty(
        "name",
        "EcoAction test"
      );
    });
  });

  describe("get all free EcoActions", () => {
    it("must return a free eco-action collection", async () => {
      // create a user
      const { token } = await getUserAndToken();

      // create an validation
      const { validations } = await getValidations();

      // create an eco-action
      await db.getRepository(EcoAction).save([
        {
          name: "EcoAction test",
          description: "Description",
          validations: validations,
        },
        {
          name: "EcoAction test2",
          description: "Description2",
          validations: validations,
        },
      ]);

      const res = await client.query({
        query: getFreeEcoActionsQuery,
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
          fetchPolicy: "no-cache",
        },
      });

      expect(res.data.getFreeEcoActions).toHaveLength(2);
    });
  });

  describe("updateEcoAction", () => {
    it("must return an error if the user requesting to modify the eco-action is not its author", async () => {
      // create a user
      const { userWithoutPassword } = await getUserAndToken();

      // create another user
      const user = await db.getRepository(User).save({
        firstName: "User2",
        lastName: "Partner2",
        email: "partner@gmain.com",
        password: "testtest",
        subscriptionType: "partner",
      });
      // create token for other user
      const token = await getJWTFor(user);

      // create an validation
      const { validations } = await getValidations();

      // create an eco-action
      const ecoAction = await db.getRepository(EcoAction).save({
        name: "EcoAction test",
        description: "Description",
        validations: validations,
        author: userWithoutPassword,
      });

      await expect(
        client.mutate({
          mutation: updateEcoActionMutation,
          variables: {
            data: {
              name: "EcoAction test",
              description: "Description",
              validationIds: validations.map((validation) => validation.id),
            },
            updateEcoActionId: ecoAction.id,
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
            fetchPolicy: "no-cache",
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"EcoAction not found"`);
    });

    it("should update an eco-action", async () => {
      // create a user
      const { token, userWithoutPassword } = await getUserAndToken();

      // create an validation
      const { validations, validationWithTypename, validationIds } =
        await getValidations();

      // create an eco-action
      const ecoAction = await db.getRepository(EcoAction).save({
        name: "EcoAction test",
        description: "Description",
        author: userWithoutPassword,
        validations: validations,
      });
      const res = await client.mutate({
        mutation: updateEcoActionMutation,
        variables: {
          data: {
            name: "EcoAction test modified",
            description: "Description modified",
            validationIds,
          },
          updateEcoActionId: ecoAction.id,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
          fetchPolicy: "no-cache",
        },
      });
      expect(res.data.updateEcoAction).toHaveProperty("id");
      expect(res.data.updateEcoAction).toHaveProperty(
        "name",
        "EcoAction test modified"
      );
      expect(res.data.updateEcoAction).toHaveProperty(
        "description",
        "Description modified"
      );
      expect(res.data.updateEcoAction).toHaveProperty(
        "validations",
        validationWithTypename
      );
    });
  });

  describe("deleteEcoAction", () => {
    it("must return an error if the user requesting to delete the eco-action is not its author", async () => {
      // create a user
      const { userWithoutPassword } = await getUserAndToken();

      // create another user
      const user = await db.getRepository(User).save({
        firstName: "User",
        lastName: "Partner",
        email: "user2@gmail.com",
        password: "testtest",
        subscriptionType: "partner",
      });

      // create token for other user
      const token = await getJWTFor(user);

      // create an validation
      const { validations } = await getValidations();

      // create an eco-action
      const ecoAction = await db.getRepository(EcoAction).save({
        name: "EcoAction test",
        description: "Description",
        validations: validations,
        author: userWithoutPassword,
      });

      await expect(
        client.mutate({
          mutation: deleteEcoActionMutation,
          variables: {
            ecoActionId: ecoAction.id,
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
            fetchPolicy: "no-cache",
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"EcoAction not found"`);
    });

    it("should delete an eco-action", async () => {
      // create a user
      const { token, userWithoutPassword } = await getUserAndToken();

      // create an validation
      const { validations } = await getValidations();

      // create an eco-action
      const ecoAction = await db.getRepository(EcoAction).save({
        name: "EcoAction test",
        description: "Description",
        validations: validations,
        author: userWithoutPassword,
      });

      const res = await client.mutate({
        mutation: deleteEcoActionMutation,
        variables: {
          ecoActionId: ecoAction.id,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
          fetchPolicy: "no-cache",
        },
      });

      expect(res.data.deleteEcoAction).toBe(true);
    });
  });
});
