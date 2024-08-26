import fs from "fs";
import datasource from "./db";
import User, { hashPassword } from "./entity/User";
import EcoAction from "./entity/EcoAction";
import Validation from "./entity/Validation";

interface EcoActionType {
  name: string | undefined;
  description: string | undefined;
  validations: Validation[];
}

const filePath = "./free-eco-actions.json";
async function parseAndEcoActions(
  validations: Validation[]
): Promise<EcoActionType[]> {
  const result = fs.readFileSync(filePath, "utf8");
  const parsedEcoActions: Partial<EcoActionType[]> = JSON.parse(result);

  const ecoActions = parsedEcoActions.map((ecoAction) => {
    return {
      name: ecoAction?.name,
      description: ecoAction?.description,
      validations: validations.filter(
        (validation) =>
          ecoAction?.validations.findIndex(
            (val) => val.points === validation.points
          ) !== -1
      ),
    };
  });

  return ecoActions;
}

async function resetDB(): Promise<void> {
  // start the connection to the database
  await datasource.initialize();

  // delete validations in the database
  await datasource.getRepository(Validation).delete({});
  // delete all eco actions in the database
  await datasource.getRepository(EcoAction).delete({});
  // delete all users in the database
  await datasource.getRepository(User).delete({});

  // create admin user
  await datasource.getRepository(User).save({
    firstName: "Admin",
    lastName: "Doe",
    email: "admin@gmail.com",
    password: await hashPassword("testtest"),
    role: "admin",
    subscriptionType: "partner",
  });

  // create validation for eco action
  let i = 0;
  const validations = [];
  for (i = 0; i < 11; i++) {
    validations.push({
      name: `Validation ${i}`,
      points: i,
    });
  }
  const savedValidations = await datasource
    .getRepository(Validation)
    .save(validations);

  // create new eco actions
  const createdEcoActions = await parseAndEcoActions(savedValidations);
  await datasource.getRepository(EcoAction).save(createdEcoActions);

  // close the connection to the database
  await datasource.destroy();

  console.log("Database reset");
}

resetDB().catch(console.error);
