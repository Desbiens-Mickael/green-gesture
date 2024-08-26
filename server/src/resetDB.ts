import datasource from "./db";
import Comment from "./entity/Comment";
import { Company } from "./entity/Company";
import EcoAction from "./entity/EcoAction";
import Group from "./entity/Group";
import Notification from "./entity/Notification";
import { Team } from "./entity/Team";
import User, { hashPassword } from "./entity/User";
import { UserEcoAction } from "./entity/UserEcoAction";
import Validation from "./entity/Validation";

async function resetDB(): Promise<void> {
  // start the connection to the database
  await datasource.initialize();

  // delete all teams in the database
  await datasource.getRepository(Team).delete({});
  // delete all comments in the database
  await datasource.getRepository(Comment).delete({});
  // delete validations in the database
  await datasource.getRepository(Validation).delete({});
  // delete userEcoActions in the database
  await datasource.getRepository(UserEcoAction).delete({});
  // delete all eco actions in the database
  await datasource.getRepository(EcoAction).delete({});
  // detlete all notifications in the database
  await datasource.getRepository(Notification).delete({});
  // delete all groups in the database
  await datasource.getRepository(Group).delete({});
  // delete all users in the database
  await datasource.getRepository(User).delete({});

  // create new users
  const admin = await datasource.getRepository(User).save({
    firstName: "Admin",
    lastName: "Doe",
    email: "admin@gmail.com",
    password: await hashPassword("testtest"),
    role: "admin",
    subscriptionType: "partner",
  });

  const userFree = await datasource.getRepository(User).save({
    firstName: "User",
    lastName: "Free",
    email: "user@gmail.com",
    password: await hashPassword("testtest"),
  });

  const userPartner = await datasource.getRepository(User).save({
    firstName: "User",
    lastName: "Partner",
    email: "partner@gmail.com",
    password: await hashPassword("testtest"),
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
  await datasource.getRepository(Validation).save(validations);

  // create Company for userPartner
  await datasource.getRepository(Company).save({
    name: "Company 1",
    creator: userPartner,
    users: [userPartner, userFree],
  });

  // create new eco actions
  const ecoActions = await datasource.getRepository(EcoAction).save([
    {
      name: "EcoAction 1",
      description: "EcoAction 1 description",
      author: userPartner,
      validations: [
        validations[0],
        validations[1],
        validations[2],
        validations[3],
      ],
    },
    {
      name: "EcoAction 2",
      description: "EcoAction 2 description",
      author: userPartner,
      validations: [
        validations[0],
        validations[2],
        validations[4],
        validations[6],
      ],
    },
    {
      name: "EcoAction 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl. Donec euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc sit amet nisl",
      validations: [
        validations[0],
        validations[3],
        validations[6],
        validations[9],
      ],
    },
  ]);

  // create new groups
  const groups = await datasource.getRepository(Group).save([
    {
      name: "GreenGesture 1",
      challengeName: "Challenge 1",
      startDate: "2016-01-25T10:10:10.555555",
      endDate: "2020-01-25T10:10:10.555555",
      author: admin,
      users: [admin],
      ecoActions,
    },
    {
      name: "GreenGesture 2",
      challengeName: "Challenge 2",
      startDate: "2016-01-25T10:10:10.555555",
      endDate: "2020-01-25T10:10:10.555555",
      author: userFree,
      users: [admin, userFree],
      ecoActions,
    },
    {
      name: "GreenGesture 3",
      challengeName: "Challenge 3",
      startDate: "2023-06-25T10:10:10.555555",
      endDate: "2023-06-25T23:30:10.555555",
      author: userPartner,
      users: [admin, userFree, userPartner],
      ecoActions,
    },
  ]);

  // create Team for Green Gesture 3
  await datasource.getRepository(Team).save([
    {
      name: "Team 1",
      group: groups[2],
      users: [admin],
    },
    {
      name: "Team 2",
      group: groups[2],
      users: [userPartner, userFree],
    },
  ]);

  // create new userEcoActions
  await datasource.getRepository(UserEcoAction).save([
    {
      user: userFree,
      groupId: groups[2].id,
      ecoAction: ecoActions[0],
      points: ecoActions[0].validations[0].points,
    },
    {
      user: userFree,
      groupId: groups[2].id,
      ecoAction: ecoActions[1],
      points: ecoActions[1].validations[2].points,
    },
    {
      user: userFree,
      groupId: groups[1].id,
      ecoAction: ecoActions[2],
      points: ecoActions[2].validations[0].points,
    },
    {
      user: userPartner,
      groupId: groups[0].id,
      ecoAction: ecoActions[0],
      points: ecoActions[0].validations[1].points,
    },
    {
      user: userPartner,
      groupId: groups[0].id,
      ecoAction: ecoActions[1],
      points: ecoActions[1].validations[2].points,
    },
    {
      user: userPartner,
      groupId: groups[1].id,
      ecoAction: ecoActions[1],
      points: ecoActions[1].validations[1].points,
    },
    {
      user: admin,
      groupId: groups[0].id,
      ecoAction: ecoActions[0],
      points: ecoActions[0].validations[2].points,
    },
    {
      user: admin,
      groupId: groups[1].id,
      ecoAction: ecoActions[1],
      points: ecoActions[1].validations[1].points,
    },
  ]);

  // create new comments
  // comments group 1
  await datasource.getRepository(Comment).save([
    {
      message: "Commentaire 1: Group 1",
      author: userFree,
      group: groups[0],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 2: Group 1",
      author: userFree,
      group: groups[0],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 3: Group 1",
      author: userPartner,
      group: groups[0],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 4: Group 1",
      author: userFree,
      group: groups[0],
      createdAt: new Date(),
    },
  ]);
  // comments group 2
  await datasource.getRepository(Comment).save([
    {
      message: "Commentaire 1: Group 2",
      author: userFree,
      group: groups[1],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 2: Group 2",
      author: userFree,
      group: groups[1],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 3: Group 2",
      author: userPartner,
      group: groups[1],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 4: Group 2",
      author: userFree,
      group: groups[1],
      createdAt: new Date(),
    },
  ]);

  // close the connection to the database
  await datasource.destroy();

  console.log("Database reset");
}

resetDB().catch(console.error);
