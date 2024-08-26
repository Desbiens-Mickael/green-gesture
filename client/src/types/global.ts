import { CreateTeamInput } from "@/gql/generated/schema";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subscriptionType: string;
  role: string;
  company?: string | undefined;
};

export type Formula = "free" | "partner";

export type Participant = { id: User["id"]; name: string };

export type GroupeCreationType = {
  name: string;
  challengeName: string;
  dates: { from: Date; to: Date };
  participants: Participant[];
  ecoActionsIds: number[];
  teams: CreateTeamInput[];
};

export type GroupType = {
  id: number;
  challengeName: string;
  startDate: string;
  name: string;
  endDate: string;
  users: User[];
  author: User;
  ecoActions: EcoActionType[];
};

export type ValidationType = {
  id: number;
  name: string;
  points: number;
};

export type EcoActionType = {
  id: number;
  name: string;
  likes: number;
  description: string;
  author?: Partial<User>;
  validations?: ValidationType[];
};

export enum NotificationStatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export enum NotificationTypeEnum {
  CHALLENGE_REQUEST = "challenge_request",
  FRIEND_REQUEST = "friend_request",
}

export type EcoActionUpdateType = {
  name: string;
  description: string;
  validationIds: number[];
};
