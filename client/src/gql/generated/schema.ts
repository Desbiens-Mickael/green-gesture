import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  createdAt: Scalars['DateTime']['output'];
  group: Group;
  id: Scalars['Float']['output'];
  message: Scalars['String']['output'];
};

export type CommentInputCreation = {
  groupId: Scalars['Float']['input'];
  message: Scalars['String']['input'];
};

export type Company = {
  __typename?: 'Company';
  creator: User;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type CreateTeamInput = {
  name: Scalars['String']['input'];
  userIds: Array<Scalars['Int']['input']>;
};

export type CreateTeamsInput = {
  groupId: Scalars['Int']['input'];
  teams: Array<CreateTeamInput>;
};

export type EcoAction = {
  __typename?: 'EcoAction';
  author?: Maybe<User>;
  description: Scalars['String']['output'];
  groups?: Maybe<Array<Group>>;
  id: Scalars['Float']['output'];
  likes: Scalars['Float']['output'];
  likesList: Array<LikeEcoAction>;
  name: Scalars['String']['output'];
  userEcoActions: Array<UserEcoAction>;
  validations: Array<Validation>;
};

export type EcoActionInputCreation = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  validationIds: Array<Scalars['Int']['input']>;
};

export type Group = {
  __typename?: 'Group';
  author: User;
  challengeName: Scalars['String']['output'];
  ecoActions: Array<EcoAction>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  teams: Array<Team>;
  users: Array<User>;
};

export type GroupInputAddEcoActions = {
  ecoActionIds: Array<Scalars['Int']['input']>;
  groupId: Scalars['Float']['input'];
};

export type GroupInputAddOneUser = {
  groupId: Scalars['Float']['input'];
  userId: Scalars['Int']['input'];
};

export type GroupInputCreation = {
  challengeName: Scalars['String']['input'];
  ecoActionsIds: Array<Scalars['Int']['input']>;
  endDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  participants: Array<Scalars['Int']['input']>;
  startDate: Scalars['DateTime']['input'];
};

export type LikeEcoAction = {
  __typename?: 'LikeEcoAction';
  ecoAction: EcoAction;
  id: Scalars['Float']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEcoActionsToGroup: Group;
  addFriend: User;
  addProof: Scalars['String']['output'];
  addUserToGroup: Group;
  addUsersToCompany: Company;
  addUsersToTeam: Team;
  changeNotificationStatus: Notification;
  createComment: Comment;
  createEcoAction: EcoAction;
  createGroup: Group;
  createLike: LikeEcoAction;
  createTeams: Array<Team>;
  createUser: User;
  createUserEcoAction: Scalars['String']['output'];
  deleteEcoAction: Scalars['Boolean']['output'];
  deleteLike: Scalars['Boolean']['output'];
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  removeFriend: Scalars['String']['output'];
  removeUserFromGroup: Group;
  sendNotification: Notification;
  unsubscribe: Scalars['Boolean']['output'];
  updateEcoAction: EcoAction;
};


export type MutationAddEcoActionsToGroupArgs = {
  data: GroupInputAddEcoActions;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['Int']['input'];
};


export type MutationAddProofArgs = {
  data: UserEcoActionInputAddProof;
};


export type MutationAddUserToGroupArgs = {
  data: GroupInputAddOneUser;
};


export type MutationAddUsersToCompanyArgs = {
  companyId: Scalars['Int']['input'];
  users: Array<Scalars['Int']['input']>;
};


export type MutationAddUsersToTeamArgs = {
  data: TeamInputAddUsers;
};


export type MutationChangeNotificationStatusArgs = {
  data: NotificationInputStatusChange;
};


export type MutationCreateCommentArgs = {
  data: CommentInputCreation;
};


export type MutationCreateEcoActionArgs = {
  data: EcoActionInputCreation;
};


export type MutationCreateGroupArgs = {
  data: GroupInputCreation;
};


export type MutationCreateLikeArgs = {
  ecoActionId: Scalars['Int']['input'];
};


export type MutationCreateTeamsArgs = {
  data: CreateTeamsInput;
};


export type MutationCreateUserArgs = {
  data: UserInputSubscribe;
};


export type MutationCreateUserEcoActionArgs = {
  data: UserEcoActionInputAddPoints;
};


export type MutationDeleteEcoActionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteLikeArgs = {
  ecoActionId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  data: UserInputLogin;
};


export type MutationRemoveFriendArgs = {
  friendId: Scalars['Int']['input'];
};


export type MutationRemoveUserFromGroupArgs = {
  data: GroupInputAddOneUser;
};


export type MutationSendNotificationArgs = {
  data: NotificationInputCreation;
};


export type MutationUpdateEcoActionArgs = {
  data: EcoActionInputCreation;
  id: Scalars['Int']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  group?: Maybe<Group>;
  id: Scalars['Float']['output'];
  receiver: User;
  sender: User;
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type NotificationInputCreation = {
  groupId?: InputMaybe<Scalars['Float']['input']>;
  receiverId: Scalars['Float']['input'];
  type: Scalars['String']['input'];
};

export type NotificationInputStatusChange = {
  notificationId: Scalars['Float']['input'];
  status: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllValidations: Array<Validation>;
  getCommentsForGroup: Array<Comment>;
  getCurrentUser: User;
  getEcoActionbyId: EcoAction;
  getFreeEcoActions: Array<EcoAction>;
  getGroup: Group;
  getGroups: Array<Group>;
  getMaxValidationPoints: Validation;
  getNotifications: Array<Notification>;
  getNumberLikes: Scalars['Float']['output'];
  getPopularFreeEcoActions: Array<EcoAction>;
  getTeamByGroup: Array<Team>;
  getTotalPossiblePoints: Scalars['Int']['output'];
  getUserById: User;
  getUserEcoAction: UserEcoAction;
  getUserEcoActions: Array<EcoAction>;
  getUserEcoActionsByGroupId: Array<UserEcoAction>;
  getUserGroups: Array<Group>;
  getUsers: Array<User>;
  getUsersAlreadyAdded: Array<User>;
  getUsersByName: Array<User>;
  getUsersByTeam: Array<User>;
  getValidation: Validation;
  getValidationsByEcoAction: Array<Validation>;
  isEmailAlreadyUsed: Scalars['Boolean']['output'];
  isLiked: Scalars['Boolean']['output'];
  users: Array<User>;
};


export type QueryGetCommentsForGroupArgs = {
  groupId: Scalars['Float']['input'];
};


export type QueryGetEcoActionbyIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetGroupArgs = {
  groupId: Scalars['Float']['input'];
};


export type QueryGetMaxValidationPointsArgs = {
  ecoActionId: Scalars['Int']['input'];
};


export type QueryGetNumberLikesArgs = {
  ecoActionId: Scalars['Int']['input'];
};


export type QueryGetTeamByGroupArgs = {
  groupId: Scalars['Float']['input'];
};


export type QueryGetTotalPossiblePointsArgs = {
  ecoAactionIds: Array<Scalars['Int']['input']>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserEcoActionArgs = {
  ecoActionId: Scalars['Int']['input'];
  groupId: Scalars['Int']['input'];
};


export type QueryGetUserEcoActionsByGroupIdArgs = {
  groupId: Scalars['Int']['input'];
};


export type QueryGetUsersByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetUsersByTeamArgs = {
  teamId: Scalars['Float']['input'];
};


export type QueryGetValidationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetValidationsByEcoActionArgs = {
  ecoActionId: Scalars['Int']['input'];
};


export type QueryIsEmailAlreadyUsedArgs = {
  email: Scalars['String']['input'];
};


export type QueryIsLikedArgs = {
  ecoActionId: Scalars['Int']['input'];
};

export type Team = {
  __typename?: 'Team';
  group: Group;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  users?: Maybe<Array<User>>;
};

export type TeamInputAddUsers = {
  teamId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  company?: Maybe<Company>;
  createdCompany?: Maybe<Company>;
  createdEcoActions: Array<EcoAction>;
  createdGroups: Array<Group>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  friends?: Maybe<Array<User>>;
  groups?: Maybe<Array<Group>>;
  id: Scalars['Float']['output'];
  lastName: Scalars['String']['output'];
  likes: Array<LikeEcoAction>;
  password: Scalars['String']['output'];
  relatedEcoActions: Array<UserEcoAction>;
  role: Scalars['String']['output'];
  subscriptionId: Scalars['String']['output'];
  subscriptionType: Scalars['String']['output'];
  teams?: Maybe<Team>;
};

export type UserEcoAction = {
  __typename?: 'UserEcoAction';
  ecoAction: EcoAction;
  groupId: Scalars['Int']['output'];
  id: Scalars['Float']['output'];
  points?: Maybe<Scalars['Float']['output']>;
  proof?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type UserEcoActionInputAddPoints = {
  ecoActionId: Scalars['Int']['input'];
  groupId: Scalars['Int']['input'];
  points: Scalars['Int']['input'];
  proof?: InputMaybe<Scalars['String']['input']>;
};

export type UserEcoActionInputAddProof = {
  proof: Scalars['String']['input'];
  userEcoActionId: Scalars['Float']['input'];
};

export type UserInputLogin = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserInputSubscribe = {
  company?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Scalars['String']['input']>;
  subscriptionId?: InputMaybe<Scalars['String']['input']>;
  subscriptionType?: InputMaybe<Scalars['String']['input']>;
};

export type Validation = {
  __typename?: 'Validation';
  ecoAction: EcoAction;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  points: Scalars['Float']['output'];
};

export type AddFriendMutationVariables = Exact<{
  friendId: Scalars['Int']['input'];
}>;


export type AddFriendMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'User', id: number } };

export type CreateLikeMutationVariables = Exact<{
  ecoActionId: Scalars['Int']['input'];
}>;


export type CreateLikeMutation = { __typename?: 'Mutation', createLike: { __typename?: 'LikeEcoAction', id: number } };

export type AddProofMutationVariables = Exact<{
  data: UserEcoActionInputAddProof;
}>;


export type AddProofMutation = { __typename?: 'Mutation', addProof: string };

export type CreateCommentMutationVariables = Exact<{
  data: CommentInputCreation;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number } };

export type CreateEcoActionMutationVariables = Exact<{
  data: EcoActionInputCreation;
}>;


export type CreateEcoActionMutation = { __typename?: 'Mutation', createEcoAction: { __typename?: 'EcoAction', id: number, name: string, description: string, author?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null, validations: Array<{ __typename?: 'Validation', id: number, points: number }> } };

export type CreateGroupMutationVariables = Exact<{
  data: GroupInputCreation;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: number, name: string } };

export type CreateTeamsMutationVariables = Exact<{
  data: CreateTeamsInput;
}>;


export type CreateTeamsMutation = { __typename?: 'Mutation', createTeams: Array<{ __typename?: 'Team', id: number, name: string, users?: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string }> | null }> };

export type CreateUserEcoActionMutationVariables = Exact<{
  data: UserEcoActionInputAddPoints;
}>;


export type CreateUserEcoActionMutation = { __typename?: 'Mutation', createUserEcoAction: string };

export type DeleteEcoActionMutationVariables = Exact<{
  ecoActionId: Scalars['Int']['input'];
}>;


export type DeleteEcoActionMutation = { __typename?: 'Mutation', deleteEcoAction: boolean };

export type DeleteLikeMutationVariables = Exact<{
  ecoActionId: Scalars['Int']['input'];
}>;


export type DeleteLikeMutation = { __typename?: 'Mutation', deleteLike: boolean };

export type GetAllValidationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllValidationsQuery = { __typename?: 'Query', getAllValidations: Array<{ __typename?: 'Validation', id: number, points: number }> };

export type GetCommentsForGroupQueryVariables = Exact<{
  groupId: Scalars['Float']['input'];
}>;


export type GetCommentsForGroupQuery = { __typename?: 'Query', getCommentsForGroup: Array<{ __typename?: 'Comment', id: number, createdAt: any, message: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string } }> };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string, subscriptionType: string, subscriptionId: string, friends?: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, groups?: Array<{ __typename?: 'Group', id: number }> | null }> | null, groups?: Array<{ __typename?: 'Group', startDate: any, endDate: any, name: string, challengeName: string, id: number }> | null, createdEcoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, description: string }>, company?: { __typename?: 'Company', id: number, name: string, users: Array<{ __typename?: 'User', id: number }> } | null } };

export type GetEcoActionbyIdQueryVariables = Exact<{
  EcoActionId: Scalars['Int']['input'];
}>;


export type GetEcoActionbyIdQuery = { __typename?: 'Query', getEcoActionbyId: { __typename?: 'EcoAction', name: string, description: string, validations: Array<{ __typename?: 'Validation', id: number, points: number }> } };

export type GetFreeEcoActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFreeEcoActionsQuery = { __typename?: 'Query', getFreeEcoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, description: string, likes: number }> };

export type GetGroupQueryVariables = Exact<{
  groupId: Scalars['Float']['input'];
}>;


export type GetGroupQuery = { __typename?: 'Query', getGroup: { __typename?: 'Group', id: number, name: string, challengeName: string, startDate: any, endDate: any, author: { __typename?: 'User', id: number, firstName: string, lastName: string }, users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }>, ecoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, description: string, likes: number, validations: Array<{ __typename?: 'Validation', points: number, id: number }> }>, teams: Array<{ __typename?: 'Team', id: number, name: string, users?: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> | null }> } };

export type GetMaxValidationPointsQueryVariables = Exact<{
  ecoActionId: Scalars['Int']['input'];
}>;


export type GetMaxValidationPointsQuery = { __typename?: 'Query', getMaxValidationPoints: { __typename?: 'Validation', id: number, points: number } };

export type GetNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications: Array<{ __typename?: 'Notification', id: number, status: string, type: string, sender: { __typename?: 'User', id: number, firstName: string, lastName: string }, group?: { __typename?: 'Group', id: number, challengeName: string, startDate: any, endDate: any } | null }> };

export type GetNumberLikesQueryVariables = Exact<{
  ecoActionId: Scalars['Int']['input'];
}>;


export type GetNumberLikesQuery = { __typename?: 'Query', getNumberLikes: number };

export type GetPopularFreeEcoActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPopularFreeEcoActionsQuery = { __typename?: 'Query', getPopularFreeEcoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, likes: number, description: string }> };

export type GetTotalPossiblePointsQueryVariables = Exact<{
  ecoAactionIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type GetTotalPossiblePointsQuery = { __typename?: 'Query', getTotalPossiblePoints: number };

export type GetUserEcoActionsByGroupIdQueryVariables = Exact<{
  groupId: Scalars['Int']['input'];
}>;


export type GetUserEcoActionsByGroupIdQuery = { __typename?: 'Query', getUserEcoActionsByGroupId: Array<{ __typename?: 'UserEcoAction', id: number, groupId: number, points?: number | null, user: { __typename?: 'User', id: number } }> };

export type GetUserByIdQueryVariables = Exact<{
  getUserById: Scalars['Int']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, password: string, role: string, subscriptionType: string } };

export type GetUserEcoActionQueryVariables = Exact<{
  groupId: Scalars['Int']['input'];
  ecoActionId: Scalars['Int']['input'];
}>;


export type GetUserEcoActionQuery = { __typename?: 'Query', getUserEcoAction: { __typename?: 'UserEcoAction', id: number, proof?: string | null, points?: number | null, groupId: number, ecoAction: { __typename?: 'EcoAction', name: string, description: string, likes: number } } };

export type GetUserEcoActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserEcoActionsQuery = { __typename?: 'Query', getUserEcoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, description: string, likes: number, author?: { __typename?: 'User', firstName: string, lastName: string, email: string } | null }> };

export type GetUserGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserGroupsQuery = { __typename?: 'Query', getUserGroups: Array<{ __typename?: 'Group', id: number, challengeName: string, startDate: any, name: string, endDate: any, users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }>, author: { __typename?: 'User', id: number, firstName: string, lastName: string }, ecoActions: Array<{ __typename?: 'EcoAction', id: number, name: string }> }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, password: string, role: string, subscriptionType: string }> };

export type GetUsersAlreadyAddedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersAlreadyAddedQuery = { __typename?: 'Query', getUsersAlreadyAdded: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> };

export type GetUsersByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetUsersByNameQuery = { __typename?: 'Query', getUsersByName: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> };

export type GetValidationQueryVariables = Exact<{
  getValidationId: Scalars['Int']['input'];
}>;


export type GetValidationQuery = { __typename?: 'Query', getValidation: { __typename?: 'Validation', id: number, points: number } };

export type GetValidationsByEcoActionQueryVariables = Exact<{
  ecoActionId: Scalars['Int']['input'];
}>;


export type GetValidationsByEcoActionQuery = { __typename?: 'Query', getValidationsByEcoAction: Array<{ __typename?: 'Validation', id: number, points: number }> };

export type IsEmailAlreadyUsedQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type IsEmailAlreadyUsedQuery = { __typename?: 'Query', isEmailAlreadyUsed: boolean };

export type IsLikedQueryVariables = Exact<{
  ecoActionId: Scalars['Int']['input'];
}>;


export type IsLikedQuery = { __typename?: 'Query', isLiked: boolean };

export type LoginMutationVariables = Exact<{
  loginData: UserInputLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type CreateUserMutationVariables = Exact<{
  data: UserInputSubscribe;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, firstName: string, lastName: string, password: string } };

export type RemoveFriendMutationVariables = Exact<{
  friendId: Scalars['Int']['input'];
}>;


export type RemoveFriendMutation = { __typename?: 'Mutation', removeFriend: string };

export type RemoveUserFromGroupMutationVariables = Exact<{
  data: GroupInputAddOneUser;
}>;


export type RemoveUserFromGroupMutation = { __typename?: 'Mutation', removeUserFromGroup: { __typename?: 'Group', teams: Array<{ __typename?: 'Team', id: number, users?: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> | null }>, users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> } };

export type SendNotificationMutationVariables = Exact<{
  data: NotificationInputCreation;
}>;


export type SendNotificationMutation = { __typename?: 'Mutation', sendNotification: { __typename?: 'Notification', id: number } };

export type UnsubscribeMutationVariables = Exact<{ [key: string]: never; }>;


export type UnsubscribeMutation = { __typename?: 'Mutation', unsubscribe: boolean };

export type UpdateEcoActionMutationVariables = Exact<{
  data: EcoActionInputCreation;
  updateEcoActionId: Scalars['Int']['input'];
}>;


export type UpdateEcoActionMutation = { __typename?: 'Mutation', updateEcoAction: { __typename?: 'EcoAction', id: number, name: string, description: string, validations: Array<{ __typename?: 'Validation', id: number, points: number }> } };

export type UpdateNotificationStatusMutationVariables = Exact<{
  data: NotificationInputStatusChange;
}>;


export type UpdateNotificationStatusMutation = { __typename?: 'Mutation', changeNotificationStatus: { __typename?: 'Notification', id: number, status: string } };


export const AddFriendDocument = gql`
    mutation addFriend($friendId: Int!) {
  addFriend(friendId: $friendId) {
    id
  }
}
    `;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, options);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
export const CreateLikeDocument = gql`
    mutation CreateLike($ecoActionId: Int!) {
  createLike(ecoActionId: $ecoActionId) {
    id
  }
}
    `;
export type CreateLikeMutationFn = Apollo.MutationFunction<CreateLikeMutation, CreateLikeMutationVariables>;

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      ecoActionId: // value for 'ecoActionId'
 *   },
 * });
 */
export function useCreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateLikeMutation, CreateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CreateLikeDocument, options);
      }
export type CreateLikeMutationHookResult = ReturnType<typeof useCreateLikeMutation>;
export type CreateLikeMutationResult = Apollo.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationOptions = Apollo.BaseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables>;
export const AddProofDocument = gql`
    mutation AddProof($data: UserEcoActionInputAddProof!) {
  addProof(data: $data)
}
    `;
export type AddProofMutationFn = Apollo.MutationFunction<AddProofMutation, AddProofMutationVariables>;

/**
 * __useAddProofMutation__
 *
 * To run a mutation, you first call `useAddProofMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProofMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProofMutation, { data, loading, error }] = useAddProofMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddProofMutation(baseOptions?: Apollo.MutationHookOptions<AddProofMutation, AddProofMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProofMutation, AddProofMutationVariables>(AddProofDocument, options);
      }
export type AddProofMutationHookResult = ReturnType<typeof useAddProofMutation>;
export type AddProofMutationResult = Apollo.MutationResult<AddProofMutation>;
export type AddProofMutationOptions = Apollo.BaseMutationOptions<AddProofMutation, AddProofMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($data: CommentInputCreation!) {
  createComment(data: $data) {
    id
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateEcoActionDocument = gql`
    mutation CreateEcoAction($data: EcoActionInputCreation!) {
  createEcoAction(data: $data) {
    id
    name
    description
    author {
      id
      firstName
      lastName
    }
    validations {
      id
      points
    }
  }
}
    `;
export type CreateEcoActionMutationFn = Apollo.MutationFunction<CreateEcoActionMutation, CreateEcoActionMutationVariables>;

/**
 * __useCreateEcoActionMutation__
 *
 * To run a mutation, you first call `useCreateEcoActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEcoActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEcoActionMutation, { data, loading, error }] = useCreateEcoActionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateEcoActionMutation(baseOptions?: Apollo.MutationHookOptions<CreateEcoActionMutation, CreateEcoActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEcoActionMutation, CreateEcoActionMutationVariables>(CreateEcoActionDocument, options);
      }
export type CreateEcoActionMutationHookResult = ReturnType<typeof useCreateEcoActionMutation>;
export type CreateEcoActionMutationResult = Apollo.MutationResult<CreateEcoActionMutation>;
export type CreateEcoActionMutationOptions = Apollo.BaseMutationOptions<CreateEcoActionMutation, CreateEcoActionMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($data: GroupInputCreation!) {
  createGroup(data: $data) {
    id
    name
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateTeamsDocument = gql`
    mutation CreateTeams($data: CreateTeamsInput!) {
  createTeams(data: $data) {
    id
    name
    users {
      id
      firstName
      lastName
      email
    }
  }
}
    `;
export type CreateTeamsMutationFn = Apollo.MutationFunction<CreateTeamsMutation, CreateTeamsMutationVariables>;

/**
 * __useCreateTeamsMutation__
 *
 * To run a mutation, you first call `useCreateTeamsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamsMutation, { data, loading, error }] = useCreateTeamsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTeamsMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamsMutation, CreateTeamsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamsMutation, CreateTeamsMutationVariables>(CreateTeamsDocument, options);
      }
export type CreateTeamsMutationHookResult = ReturnType<typeof useCreateTeamsMutation>;
export type CreateTeamsMutationResult = Apollo.MutationResult<CreateTeamsMutation>;
export type CreateTeamsMutationOptions = Apollo.BaseMutationOptions<CreateTeamsMutation, CreateTeamsMutationVariables>;
export const CreateUserEcoActionDocument = gql`
    mutation CreateUserEcoAction($data: UserEcoActionInputAddPoints!) {
  createUserEcoAction(data: $data)
}
    `;
export type CreateUserEcoActionMutationFn = Apollo.MutationFunction<CreateUserEcoActionMutation, CreateUserEcoActionMutationVariables>;

/**
 * __useCreateUserEcoActionMutation__
 *
 * To run a mutation, you first call `useCreateUserEcoActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserEcoActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserEcoActionMutation, { data, loading, error }] = useCreateUserEcoActionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserEcoActionMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserEcoActionMutation, CreateUserEcoActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserEcoActionMutation, CreateUserEcoActionMutationVariables>(CreateUserEcoActionDocument, options);
      }
export type CreateUserEcoActionMutationHookResult = ReturnType<typeof useCreateUserEcoActionMutation>;
export type CreateUserEcoActionMutationResult = Apollo.MutationResult<CreateUserEcoActionMutation>;
export type CreateUserEcoActionMutationOptions = Apollo.BaseMutationOptions<CreateUserEcoActionMutation, CreateUserEcoActionMutationVariables>;
export const DeleteEcoActionDocument = gql`
    mutation DeleteEcoAction($ecoActionId: Int!) {
  deleteEcoAction(id: $ecoActionId)
}
    `;
export type DeleteEcoActionMutationFn = Apollo.MutationFunction<DeleteEcoActionMutation, DeleteEcoActionMutationVariables>;

/**
 * __useDeleteEcoActionMutation__
 *
 * To run a mutation, you first call `useDeleteEcoActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEcoActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEcoActionMutation, { data, loading, error }] = useDeleteEcoActionMutation({
 *   variables: {
 *      ecoActionId: // value for 'ecoActionId'
 *   },
 * });
 */
export function useDeleteEcoActionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEcoActionMutation, DeleteEcoActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEcoActionMutation, DeleteEcoActionMutationVariables>(DeleteEcoActionDocument, options);
      }
export type DeleteEcoActionMutationHookResult = ReturnType<typeof useDeleteEcoActionMutation>;
export type DeleteEcoActionMutationResult = Apollo.MutationResult<DeleteEcoActionMutation>;
export type DeleteEcoActionMutationOptions = Apollo.BaseMutationOptions<DeleteEcoActionMutation, DeleteEcoActionMutationVariables>;
export const DeleteLikeDocument = gql`
    mutation DeleteLike($ecoActionId: Int!) {
  deleteLike(ecoActionId: $ecoActionId)
}
    `;
export type DeleteLikeMutationFn = Apollo.MutationFunction<DeleteLikeMutation, DeleteLikeMutationVariables>;

/**
 * __useDeleteLikeMutation__
 *
 * To run a mutation, you first call `useDeleteLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeMutation, { data, loading, error }] = useDeleteLikeMutation({
 *   variables: {
 *      ecoActionId: // value for 'ecoActionId'
 *   },
 * });
 */
export function useDeleteLikeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLikeMutation, DeleteLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(DeleteLikeDocument, options);
      }
export type DeleteLikeMutationHookResult = ReturnType<typeof useDeleteLikeMutation>;
export type DeleteLikeMutationResult = Apollo.MutationResult<DeleteLikeMutation>;
export type DeleteLikeMutationOptions = Apollo.BaseMutationOptions<DeleteLikeMutation, DeleteLikeMutationVariables>;
export const GetAllValidationsDocument = gql`
    query GetAllValidations {
  getAllValidations {
    id
    points
  }
}
    `;

/**
 * __useGetAllValidationsQuery__
 *
 * To run a query within a React component, call `useGetAllValidationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllValidationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllValidationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllValidationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllValidationsQuery, GetAllValidationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllValidationsQuery, GetAllValidationsQueryVariables>(GetAllValidationsDocument, options);
      }
export function useGetAllValidationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllValidationsQuery, GetAllValidationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllValidationsQuery, GetAllValidationsQueryVariables>(GetAllValidationsDocument, options);
        }
export type GetAllValidationsQueryHookResult = ReturnType<typeof useGetAllValidationsQuery>;
export type GetAllValidationsLazyQueryHookResult = ReturnType<typeof useGetAllValidationsLazyQuery>;
export type GetAllValidationsQueryResult = Apollo.QueryResult<GetAllValidationsQuery, GetAllValidationsQueryVariables>;
export const GetCommentsForGroupDocument = gql`
    query GetCommentsForGroup($groupId: Float!) {
  getCommentsForGroup(groupId: $groupId) {
    id
    createdAt
    message
    author {
      id
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetCommentsForGroupQuery__
 *
 * To run a query within a React component, call `useGetCommentsForGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsForGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsForGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetCommentsForGroupQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsForGroupQuery, GetCommentsForGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsForGroupQuery, GetCommentsForGroupQueryVariables>(GetCommentsForGroupDocument, options);
      }
export function useGetCommentsForGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsForGroupQuery, GetCommentsForGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsForGroupQuery, GetCommentsForGroupQueryVariables>(GetCommentsForGroupDocument, options);
        }
export type GetCommentsForGroupQueryHookResult = ReturnType<typeof useGetCommentsForGroupQuery>;
export type GetCommentsForGroupLazyQueryHookResult = ReturnType<typeof useGetCommentsForGroupLazyQuery>;
export type GetCommentsForGroupQueryResult = Apollo.QueryResult<GetCommentsForGroupQuery, GetCommentsForGroupQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    firstName
    lastName
    email
    role
    subscriptionType
    subscriptionId
    friends {
      id
      firstName
      lastName
      email
      groups {
        id
      }
    }
    groups {
      startDate
      endDate
      name
      challengeName
      id
    }
    createdEcoActions {
      id
      name
      description
    }
    company {
      id
      name
      users {
        id
      }
    }
    friends {
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetEcoActionbyIdDocument = gql`
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

/**
 * __useGetEcoActionbyIdQuery__
 *
 * To run a query within a React component, call `useGetEcoActionbyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEcoActionbyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEcoActionbyIdQuery({
 *   variables: {
 *      EcoActionId: // value for 'EcoActionId'
 *   },
 * });
 */
export function useGetEcoActionbyIdQuery(baseOptions: Apollo.QueryHookOptions<GetEcoActionbyIdQuery, GetEcoActionbyIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEcoActionbyIdQuery, GetEcoActionbyIdQueryVariables>(GetEcoActionbyIdDocument, options);
      }
export function useGetEcoActionbyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEcoActionbyIdQuery, GetEcoActionbyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEcoActionbyIdQuery, GetEcoActionbyIdQueryVariables>(GetEcoActionbyIdDocument, options);
        }
export type GetEcoActionbyIdQueryHookResult = ReturnType<typeof useGetEcoActionbyIdQuery>;
export type GetEcoActionbyIdLazyQueryHookResult = ReturnType<typeof useGetEcoActionbyIdLazyQuery>;
export type GetEcoActionbyIdQueryResult = Apollo.QueryResult<GetEcoActionbyIdQuery, GetEcoActionbyIdQueryVariables>;
export const GetFreeEcoActionsDocument = gql`
    query GetFreeEcoActions {
  getFreeEcoActions {
    id
    name
    description
    likes
  }
}
    `;

/**
 * __useGetFreeEcoActionsQuery__
 *
 * To run a query within a React component, call `useGetFreeEcoActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFreeEcoActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFreeEcoActionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFreeEcoActionsQuery(baseOptions?: Apollo.QueryHookOptions<GetFreeEcoActionsQuery, GetFreeEcoActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFreeEcoActionsQuery, GetFreeEcoActionsQueryVariables>(GetFreeEcoActionsDocument, options);
      }
export function useGetFreeEcoActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFreeEcoActionsQuery, GetFreeEcoActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFreeEcoActionsQuery, GetFreeEcoActionsQueryVariables>(GetFreeEcoActionsDocument, options);
        }
export type GetFreeEcoActionsQueryHookResult = ReturnType<typeof useGetFreeEcoActionsQuery>;
export type GetFreeEcoActionsLazyQueryHookResult = ReturnType<typeof useGetFreeEcoActionsLazyQuery>;
export type GetFreeEcoActionsQueryResult = Apollo.QueryResult<GetFreeEcoActionsQuery, GetFreeEcoActionsQueryVariables>;
export const GetGroupDocument = gql`
    query GetGroup($groupId: Float!) {
  getGroup(groupId: $groupId) {
    id
    name
    challengeName
    startDate
    endDate
    author {
      id
      firstName
      lastName
    }
    users {
      id
      firstName
      lastName
    }
    ecoActions {
      id
      name
      description
      likes
      validations {
        points
        id
      }
    }
    teams {
      id
      name
      users {
        id
        firstName
        lastName
      }
    }
  }
}
    `;

/**
 * __useGetGroupQuery__
 *
 * To run a query within a React component, call `useGetGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetGroupQuery(baseOptions: Apollo.QueryHookOptions<GetGroupQuery, GetGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, options);
      }
export function useGetGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupQuery, GetGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, options);
        }
export type GetGroupQueryHookResult = ReturnType<typeof useGetGroupQuery>;
export type GetGroupLazyQueryHookResult = ReturnType<typeof useGetGroupLazyQuery>;
export type GetGroupQueryResult = Apollo.QueryResult<GetGroupQuery, GetGroupQueryVariables>;
export const GetMaxValidationPointsDocument = gql`
    query GetMaxValidationPoints($ecoActionId: Int!) {
  getMaxValidationPoints(ecoActionId: $ecoActionId) {
    id
    points
  }
}
    `;

/**
 * __useGetMaxValidationPointsQuery__
 *
 * To run a query within a React component, call `useGetMaxValidationPointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMaxValidationPointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMaxValidationPointsQuery({
 *   variables: {
 *      ecoActionId: // value for 'ecoActionId'
 *   },
 * });
 */
export function useGetMaxValidationPointsQuery(baseOptions: Apollo.QueryHookOptions<GetMaxValidationPointsQuery, GetMaxValidationPointsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMaxValidationPointsQuery, GetMaxValidationPointsQueryVariables>(GetMaxValidationPointsDocument, options);
      }
export function useGetMaxValidationPointsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMaxValidationPointsQuery, GetMaxValidationPointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMaxValidationPointsQuery, GetMaxValidationPointsQueryVariables>(GetMaxValidationPointsDocument, options);
        }
export type GetMaxValidationPointsQueryHookResult = ReturnType<typeof useGetMaxValidationPointsQuery>;
export type GetMaxValidationPointsLazyQueryHookResult = ReturnType<typeof useGetMaxValidationPointsLazyQuery>;
export type GetMaxValidationPointsQueryResult = Apollo.QueryResult<GetMaxValidationPointsQuery, GetMaxValidationPointsQueryVariables>;
export const GetNotificationsDocument = gql`
    query getNotifications {
  getNotifications {
    id
    status
    type
    sender {
      id
      firstName
      lastName
    }
    group {
      id
      challengeName
      startDate
      endDate
    }
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetNumberLikesDocument = gql`
    query getNumberLikes($ecoActionId: Int!) {
  getNumberLikes(ecoActionId: $ecoActionId)
}
    `;

/**
 * __useGetNumberLikesQuery__
 *
 * To run a query within a React component, call `useGetNumberLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNumberLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNumberLikesQuery({
 *   variables: {
 *      ecoActionId: // value for 'ecoActionId'
 *   },
 * });
 */
export function useGetNumberLikesQuery(baseOptions: Apollo.QueryHookOptions<GetNumberLikesQuery, GetNumberLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNumberLikesQuery, GetNumberLikesQueryVariables>(GetNumberLikesDocument, options);
      }
export function useGetNumberLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNumberLikesQuery, GetNumberLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNumberLikesQuery, GetNumberLikesQueryVariables>(GetNumberLikesDocument, options);
        }
export type GetNumberLikesQueryHookResult = ReturnType<typeof useGetNumberLikesQuery>;
export type GetNumberLikesLazyQueryHookResult = ReturnType<typeof useGetNumberLikesLazyQuery>;
export type GetNumberLikesQueryResult = Apollo.QueryResult<GetNumberLikesQuery, GetNumberLikesQueryVariables>;
export const GetPopularFreeEcoActionsDocument = gql`
    query GetPopularFreeEcoActions {
  getPopularFreeEcoActions {
    id
    name
    likes
    description
  }
}
    `;

/**
 * __useGetPopularFreeEcoActionsQuery__
 *
 * To run a query within a React component, call `useGetPopularFreeEcoActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPopularFreeEcoActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPopularFreeEcoActionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPopularFreeEcoActionsQuery(baseOptions?: Apollo.QueryHookOptions<GetPopularFreeEcoActionsQuery, GetPopularFreeEcoActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPopularFreeEcoActionsQuery, GetPopularFreeEcoActionsQueryVariables>(GetPopularFreeEcoActionsDocument, options);
      }
export function useGetPopularFreeEcoActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPopularFreeEcoActionsQuery, GetPopularFreeEcoActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPopularFreeEcoActionsQuery, GetPopularFreeEcoActionsQueryVariables>(GetPopularFreeEcoActionsDocument, options);
        }
export type GetPopularFreeEcoActionsQueryHookResult = ReturnType<typeof useGetPopularFreeEcoActionsQuery>;
export type GetPopularFreeEcoActionsLazyQueryHookResult = ReturnType<typeof useGetPopularFreeEcoActionsLazyQuery>;
export type GetPopularFreeEcoActionsQueryResult = Apollo.QueryResult<GetPopularFreeEcoActionsQuery, GetPopularFreeEcoActionsQueryVariables>;
export const GetTotalPossiblePointsDocument = gql`
    query GetTotalPossiblePoints($ecoAactionIds: [Int!]!) {
  getTotalPossiblePoints(ecoAactionIds: $ecoAactionIds)
}
    `;

/**
 * __useGetTotalPossiblePointsQuery__
 *
 * To run a query within a React component, call `useGetTotalPossiblePointsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTotalPossiblePointsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTotalPossiblePointsQuery({
 *   variables: {
 *      ecoAactionIds: // value for 'ecoAactionIds'
 *   },
 * });
 */
export function useGetTotalPossiblePointsQuery(baseOptions: Apollo.QueryHookOptions<GetTotalPossiblePointsQuery, GetTotalPossiblePointsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTotalPossiblePointsQuery, GetTotalPossiblePointsQueryVariables>(GetTotalPossiblePointsDocument, options);
      }
export function useGetTotalPossiblePointsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTotalPossiblePointsQuery, GetTotalPossiblePointsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTotalPossiblePointsQuery, GetTotalPossiblePointsQueryVariables>(GetTotalPossiblePointsDocument, options);
        }
export type GetTotalPossiblePointsQueryHookResult = ReturnType<typeof useGetTotalPossiblePointsQuery>;
export type GetTotalPossiblePointsLazyQueryHookResult = ReturnType<typeof useGetTotalPossiblePointsLazyQuery>;
export type GetTotalPossiblePointsQueryResult = Apollo.QueryResult<GetTotalPossiblePointsQuery, GetTotalPossiblePointsQueryVariables>;
export const GetUserEcoActionsByGroupIdDocument = gql`
    query GetUserEcoActionsByGroupId($groupId: Int!) {
  getUserEcoActionsByGroupId(groupId: $groupId) {
    id
    groupId
    points
    user {
      id
    }
  }
}
    `;

/**
 * __useGetUserEcoActionsByGroupIdQuery__
 *
 * To run a query within a React component, call `useGetUserEcoActionsByGroupIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEcoActionsByGroupIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEcoActionsByGroupIdQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetUserEcoActionsByGroupIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserEcoActionsByGroupIdQuery, GetUserEcoActionsByGroupIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEcoActionsByGroupIdQuery, GetUserEcoActionsByGroupIdQueryVariables>(GetUserEcoActionsByGroupIdDocument, options);
      }
export function useGetUserEcoActionsByGroupIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserEcoActionsByGroupIdQuery, GetUserEcoActionsByGroupIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEcoActionsByGroupIdQuery, GetUserEcoActionsByGroupIdQueryVariables>(GetUserEcoActionsByGroupIdDocument, options);
        }
export type GetUserEcoActionsByGroupIdQueryHookResult = ReturnType<typeof useGetUserEcoActionsByGroupIdQuery>;
export type GetUserEcoActionsByGroupIdLazyQueryHookResult = ReturnType<typeof useGetUserEcoActionsByGroupIdLazyQuery>;
export type GetUserEcoActionsByGroupIdQueryResult = Apollo.QueryResult<GetUserEcoActionsByGroupIdQuery, GetUserEcoActionsByGroupIdQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($getUserById: Int!) {
  getUserById(id: $getUserById) {
    id
    firstName
    lastName
    email
    password
    role
    subscriptionType
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      getUserById: // value for 'getUserById'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserEcoActionDocument = gql`
    query GetUserEcoAction($groupId: Int!, $ecoActionId: Int!) {
  getUserEcoAction(groupId: $groupId, ecoActionId: $ecoActionId) {
    id
    proof
    points
    groupId
    ecoAction {
      name
      description
      likes
    }
  }
}
    `;

/**
 * __useGetUserEcoActionQuery__
 *
 * To run a query within a React component, call `useGetUserEcoActionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEcoActionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEcoActionQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      ecoActionId: // value for 'ecoActionId'
 *   },
 * });
 */
export function useGetUserEcoActionQuery(baseOptions: Apollo.QueryHookOptions<GetUserEcoActionQuery, GetUserEcoActionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEcoActionQuery, GetUserEcoActionQueryVariables>(GetUserEcoActionDocument, options);
      }
export function useGetUserEcoActionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserEcoActionQuery, GetUserEcoActionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEcoActionQuery, GetUserEcoActionQueryVariables>(GetUserEcoActionDocument, options);
        }
export type GetUserEcoActionQueryHookResult = ReturnType<typeof useGetUserEcoActionQuery>;
export type GetUserEcoActionLazyQueryHookResult = ReturnType<typeof useGetUserEcoActionLazyQuery>;
export type GetUserEcoActionQueryResult = Apollo.QueryResult<GetUserEcoActionQuery, GetUserEcoActionQueryVariables>;
export const GetUserEcoActionsDocument = gql`
    query GetUserEcoActions {
  getUserEcoActions {
    id
    name
    description
    likes
    author {
      firstName
      lastName
      email
    }
  }
}
    `;

/**
 * __useGetUserEcoActionsQuery__
 *
 * To run a query within a React component, call `useGetUserEcoActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEcoActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEcoActionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserEcoActionsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserEcoActionsQuery, GetUserEcoActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEcoActionsQuery, GetUserEcoActionsQueryVariables>(GetUserEcoActionsDocument, options);
      }
export function useGetUserEcoActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserEcoActionsQuery, GetUserEcoActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEcoActionsQuery, GetUserEcoActionsQueryVariables>(GetUserEcoActionsDocument, options);
        }
export type GetUserEcoActionsQueryHookResult = ReturnType<typeof useGetUserEcoActionsQuery>;
export type GetUserEcoActionsLazyQueryHookResult = ReturnType<typeof useGetUserEcoActionsLazyQuery>;
export type GetUserEcoActionsQueryResult = Apollo.QueryResult<GetUserEcoActionsQuery, GetUserEcoActionsQueryVariables>;
export const GetUserGroupsDocument = gql`
    query GetUserGroups {
  getUserGroups {
    id
    users {
      id
      firstName
      lastName
    }
    challengeName
    startDate
    name
    endDate
    author {
      id
      firstName
      lastName
    }
    ecoActions {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserGroupsQuery__
 *
 * To run a query within a React component, call `useGetUserGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserGroupsQuery, GetUserGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserGroupsQuery, GetUserGroupsQueryVariables>(GetUserGroupsDocument, options);
      }
export function useGetUserGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserGroupsQuery, GetUserGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserGroupsQuery, GetUserGroupsQueryVariables>(GetUserGroupsDocument, options);
        }
export type GetUserGroupsQueryHookResult = ReturnType<typeof useGetUserGroupsQuery>;
export type GetUserGroupsLazyQueryHookResult = ReturnType<typeof useGetUserGroupsLazyQuery>;
export type GetUserGroupsQueryResult = Apollo.QueryResult<GetUserGroupsQuery, GetUserGroupsQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    firstName
    lastName
    email
    password
    role
    subscriptionType
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const GetUsersAlreadyAddedDocument = gql`
    query GetUsersAlreadyAdded {
  getUsersAlreadyAdded {
    id
    firstName
    lastName
  }
}
    `;

/**
 * __useGetUsersAlreadyAddedQuery__
 *
 * To run a query within a React component, call `useGetUsersAlreadyAddedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersAlreadyAddedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersAlreadyAddedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersAlreadyAddedQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersAlreadyAddedQuery, GetUsersAlreadyAddedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersAlreadyAddedQuery, GetUsersAlreadyAddedQueryVariables>(GetUsersAlreadyAddedDocument, options);
      }
export function useGetUsersAlreadyAddedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersAlreadyAddedQuery, GetUsersAlreadyAddedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersAlreadyAddedQuery, GetUsersAlreadyAddedQueryVariables>(GetUsersAlreadyAddedDocument, options);
        }
export type GetUsersAlreadyAddedQueryHookResult = ReturnType<typeof useGetUsersAlreadyAddedQuery>;
export type GetUsersAlreadyAddedLazyQueryHookResult = ReturnType<typeof useGetUsersAlreadyAddedLazyQuery>;
export type GetUsersAlreadyAddedQueryResult = Apollo.QueryResult<GetUsersAlreadyAddedQuery, GetUsersAlreadyAddedQueryVariables>;
export const GetUsersByNameDocument = gql`
    query GetUsersByName($name: String!) {
  getUsersByName(name: $name) {
    id
    firstName
    lastName
  }
}
    `;

/**
 * __useGetUsersByNameQuery__
 *
 * To run a query within a React component, call `useGetUsersByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetUsersByNameQuery(baseOptions: Apollo.QueryHookOptions<GetUsersByNameQuery, GetUsersByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersByNameQuery, GetUsersByNameQueryVariables>(GetUsersByNameDocument, options);
      }
export function useGetUsersByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersByNameQuery, GetUsersByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersByNameQuery, GetUsersByNameQueryVariables>(GetUsersByNameDocument, options);
        }
export type GetUsersByNameQueryHookResult = ReturnType<typeof useGetUsersByNameQuery>;
export type GetUsersByNameLazyQueryHookResult = ReturnType<typeof useGetUsersByNameLazyQuery>;
export type GetUsersByNameQueryResult = Apollo.QueryResult<GetUsersByNameQuery, GetUsersByNameQueryVariables>;
export const GetValidationDocument = gql`
    query GetValidation($getValidationId: Int!) {
  getValidation(id: $getValidationId) {
    id
    points
  }
}
    `;

/**
 * __useGetValidationQuery__
 *
 * To run a query within a React component, call `useGetValidationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetValidationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetValidationQuery({
 *   variables: {
 *      getValidationId: // value for 'getValidationId'
 *   },
 * });
 */
export function useGetValidationQuery(baseOptions: Apollo.QueryHookOptions<GetValidationQuery, GetValidationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetValidationQuery, GetValidationQueryVariables>(GetValidationDocument, options);
      }
export function useGetValidationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetValidationQuery, GetValidationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetValidationQuery, GetValidationQueryVariables>(GetValidationDocument, options);
        }
export type GetValidationQueryHookResult = ReturnType<typeof useGetValidationQuery>;
export type GetValidationLazyQueryHookResult = ReturnType<typeof useGetValidationLazyQuery>;
export type GetValidationQueryResult = Apollo.QueryResult<GetValidationQuery, GetValidationQueryVariables>;
export const GetValidationsByEcoActionDocument = gql`
    query GetValidationsByEcoAction($ecoActionId: Int!) {
  getValidationsByEcoAction(ecoActionId: $ecoActionId) {
    id
    points
  }
}
    `;

/**
 * __useGetValidationsByEcoActionQuery__
 *
 * To run a query within a React component, call `useGetValidationsByEcoActionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetValidationsByEcoActionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetValidationsByEcoActionQuery({
 *   variables: {
 *      ecoActionId: // value for 'ecoActionId'
 *   },
 * });
 */
export function useGetValidationsByEcoActionQuery(baseOptions: Apollo.QueryHookOptions<GetValidationsByEcoActionQuery, GetValidationsByEcoActionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetValidationsByEcoActionQuery, GetValidationsByEcoActionQueryVariables>(GetValidationsByEcoActionDocument, options);
      }
export function useGetValidationsByEcoActionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetValidationsByEcoActionQuery, GetValidationsByEcoActionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetValidationsByEcoActionQuery, GetValidationsByEcoActionQueryVariables>(GetValidationsByEcoActionDocument, options);
        }
export type GetValidationsByEcoActionQueryHookResult = ReturnType<typeof useGetValidationsByEcoActionQuery>;
export type GetValidationsByEcoActionLazyQueryHookResult = ReturnType<typeof useGetValidationsByEcoActionLazyQuery>;
export type GetValidationsByEcoActionQueryResult = Apollo.QueryResult<GetValidationsByEcoActionQuery, GetValidationsByEcoActionQueryVariables>;
export const IsEmailAlreadyUsedDocument = gql`
    query IsEmailAlreadyUsed($email: String!) {
  isEmailAlreadyUsed(email: $email)
}
    `;

/**
 * __useIsEmailAlreadyUsedQuery__
 *
 * To run a query within a React component, call `useIsEmailAlreadyUsedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsEmailAlreadyUsedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsEmailAlreadyUsedQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useIsEmailAlreadyUsedQuery(baseOptions: Apollo.QueryHookOptions<IsEmailAlreadyUsedQuery, IsEmailAlreadyUsedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsEmailAlreadyUsedQuery, IsEmailAlreadyUsedQueryVariables>(IsEmailAlreadyUsedDocument, options);
      }
export function useIsEmailAlreadyUsedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsEmailAlreadyUsedQuery, IsEmailAlreadyUsedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsEmailAlreadyUsedQuery, IsEmailAlreadyUsedQueryVariables>(IsEmailAlreadyUsedDocument, options);
        }
export type IsEmailAlreadyUsedQueryHookResult = ReturnType<typeof useIsEmailAlreadyUsedQuery>;
export type IsEmailAlreadyUsedLazyQueryHookResult = ReturnType<typeof useIsEmailAlreadyUsedLazyQuery>;
export type IsEmailAlreadyUsedQueryResult = Apollo.QueryResult<IsEmailAlreadyUsedQuery, IsEmailAlreadyUsedQueryVariables>;
export const IsLikedDocument = gql`
    query IsLiked($ecoActionId: Int!) {
  isLiked(ecoActionId: $ecoActionId)
}
    `;

/**
 * __useIsLikedQuery__
 *
 * To run a query within a React component, call `useIsLikedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsLikedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsLikedQuery({
 *   variables: {
 *      ecoActionId: // value for 'ecoActionId'
 *   },
 * });
 */
export function useIsLikedQuery(baseOptions: Apollo.QueryHookOptions<IsLikedQuery, IsLikedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsLikedQuery, IsLikedQueryVariables>(IsLikedDocument, options);
      }
export function useIsLikedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsLikedQuery, IsLikedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsLikedQuery, IsLikedQueryVariables>(IsLikedDocument, options);
        }
export type IsLikedQueryHookResult = ReturnType<typeof useIsLikedQuery>;
export type IsLikedLazyQueryHookResult = ReturnType<typeof useIsLikedLazyQuery>;
export type IsLikedQueryResult = Apollo.QueryResult<IsLikedQuery, IsLikedQueryVariables>;
export const LoginDocument = gql`
    mutation Login($loginData: UserInputLogin!) {
  login(data: $loginData)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginData: // value for 'loginData'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInputSubscribe!) {
  createUser(data: $data) {
    email
    firstName
    lastName
    password
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation RemoveFriend($friendId: Int!) {
  removeFriend(friendId: $friendId)
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, options);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const RemoveUserFromGroupDocument = gql`
    mutation RemoveUserFromGroup($data: GroupInputAddOneUser!) {
  removeUserFromGroup(data: $data) {
    teams {
      id
      users {
        id
        firstName
        lastName
      }
    }
    users {
      id
      firstName
      lastName
    }
  }
}
    `;
export type RemoveUserFromGroupMutationFn = Apollo.MutationFunction<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>;

/**
 * __useRemoveUserFromGroupMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromGroupMutation, { data, loading, error }] = useRemoveUserFromGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRemoveUserFromGroupMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>(RemoveUserFromGroupDocument, options);
      }
export type RemoveUserFromGroupMutationHookResult = ReturnType<typeof useRemoveUserFromGroupMutation>;
export type RemoveUserFromGroupMutationResult = Apollo.MutationResult<RemoveUserFromGroupMutation>;
export type RemoveUserFromGroupMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromGroupMutation, RemoveUserFromGroupMutationVariables>;
export const SendNotificationDocument = gql`
    mutation sendNotification($data: NotificationInputCreation!) {
  sendNotification(data: $data) {
    id
  }
}
    `;
export type SendNotificationMutationFn = Apollo.MutationFunction<SendNotificationMutation, SendNotificationMutationVariables>;

/**
 * __useSendNotificationMutation__
 *
 * To run a mutation, you first call `useSendNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNotificationMutation, { data, loading, error }] = useSendNotificationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendNotificationMutation(baseOptions?: Apollo.MutationHookOptions<SendNotificationMutation, SendNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendNotificationMutation, SendNotificationMutationVariables>(SendNotificationDocument, options);
      }
export type SendNotificationMutationHookResult = ReturnType<typeof useSendNotificationMutation>;
export type SendNotificationMutationResult = Apollo.MutationResult<SendNotificationMutation>;
export type SendNotificationMutationOptions = Apollo.BaseMutationOptions<SendNotificationMutation, SendNotificationMutationVariables>;
export const UnsubscribeDocument = gql`
    mutation Unsubscribe {
  unsubscribe
}
    `;
export type UnsubscribeMutationFn = Apollo.MutationFunction<UnsubscribeMutation, UnsubscribeMutationVariables>;

/**
 * __useUnsubscribeMutation__
 *
 * To run a mutation, you first call `useUnsubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeMutation, { data, loading, error }] = useUnsubscribeMutation({
 *   variables: {
 *   },
 * });
 */
export function useUnsubscribeMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeMutation, UnsubscribeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeMutation, UnsubscribeMutationVariables>(UnsubscribeDocument, options);
      }
export type UnsubscribeMutationHookResult = ReturnType<typeof useUnsubscribeMutation>;
export type UnsubscribeMutationResult = Apollo.MutationResult<UnsubscribeMutation>;
export type UnsubscribeMutationOptions = Apollo.BaseMutationOptions<UnsubscribeMutation, UnsubscribeMutationVariables>;
export const UpdateEcoActionDocument = gql`
    mutation UpdateEcoAction($data: EcoActionInputCreation!, $updateEcoActionId: Int!) {
  updateEcoAction(data: $data, id: $updateEcoActionId) {
    id
    name
    description
    validations {
      id
      points
    }
  }
}
    `;
export type UpdateEcoActionMutationFn = Apollo.MutationFunction<UpdateEcoActionMutation, UpdateEcoActionMutationVariables>;

/**
 * __useUpdateEcoActionMutation__
 *
 * To run a mutation, you first call `useUpdateEcoActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEcoActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEcoActionMutation, { data, loading, error }] = useUpdateEcoActionMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateEcoActionId: // value for 'updateEcoActionId'
 *   },
 * });
 */
export function useUpdateEcoActionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEcoActionMutation, UpdateEcoActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEcoActionMutation, UpdateEcoActionMutationVariables>(UpdateEcoActionDocument, options);
      }
export type UpdateEcoActionMutationHookResult = ReturnType<typeof useUpdateEcoActionMutation>;
export type UpdateEcoActionMutationResult = Apollo.MutationResult<UpdateEcoActionMutation>;
export type UpdateEcoActionMutationOptions = Apollo.BaseMutationOptions<UpdateEcoActionMutation, UpdateEcoActionMutationVariables>;
export const UpdateNotificationStatusDocument = gql`
    mutation updateNotificationStatus($data: NotificationInputStatusChange!) {
  changeNotificationStatus(data: $data) {
    id
    status
  }
}
    `;
export type UpdateNotificationStatusMutationFn = Apollo.MutationFunction<UpdateNotificationStatusMutation, UpdateNotificationStatusMutationVariables>;

/**
 * __useUpdateNotificationStatusMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationStatusMutation, { data, loading, error }] = useUpdateNotificationStatusMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateNotificationStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationStatusMutation, UpdateNotificationStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationStatusMutation, UpdateNotificationStatusMutationVariables>(UpdateNotificationStatusDocument, options);
      }
export type UpdateNotificationStatusMutationHookResult = ReturnType<typeof useUpdateNotificationStatusMutation>;
export type UpdateNotificationStatusMutationResult = Apollo.MutationResult<UpdateNotificationStatusMutation>;
export type UpdateNotificationStatusMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationStatusMutation, UpdateNotificationStatusMutationVariables>;