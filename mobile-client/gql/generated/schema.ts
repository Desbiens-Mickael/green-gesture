import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  createdAt: Scalars['DateTime'];
  group: Group;
  id: Scalars['Float'];
  message: Scalars['String'];
};

export type CommentInputCreation = {
  groupId: Scalars['Float'];
  message: Scalars['String'];
};

export type Company = {
  __typename?: 'Company';
  creator: User;
  id: Scalars['Float'];
  name: Scalars['String'];
  users: Array<User>;
};

export type CreateTeamInput = {
  name: Scalars['String'];
  userIds: Array<Scalars['Int']>;
};

export type CreateTeamsInput = {
  groupId: Scalars['Int'];
  teams: Array<CreateTeamInput>;
};

export type EcoAction = {
  __typename?: 'EcoAction';
  author?: Maybe<User>;
  description: Scalars['String'];
  groups?: Maybe<Array<Group>>;
  id: Scalars['Float'];
  likes: Scalars['Float'];
  likesList: Array<LikeEcoAction>;
  name: Scalars['String'];
  userEcoActions: Array<UserEcoAction>;
  validations: Array<Validation>;
};

export type EcoActionInputCreation = {
  description: Scalars['String'];
  name: Scalars['String'];
  validationIds: Array<Scalars['Int']>;
};

export type Group = {
  __typename?: 'Group';
  author: User;
  challengeName: Scalars['String'];
  ecoActions: Array<EcoAction>;
  endDate: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
  teams: Array<Team>;
  users: Array<User>;
};

export type GroupInputAddEcoActions = {
  ecoActionIds: Array<Scalars['Int']>;
  groupId: Scalars['Float'];
};

export type GroupInputAddOneUser = {
  groupId: Scalars['Float'];
  userId: Scalars['Int'];
};

export type GroupInputCreation = {
  challengeName: Scalars['String'];
  ecoActionsIds: Array<Scalars['Int']>;
  endDate: Scalars['DateTime'];
  name: Scalars['String'];
  participants: Array<Scalars['Int']>;
  startDate: Scalars['DateTime'];
};

export type LikeEcoAction = {
  __typename?: 'LikeEcoAction';
  ecoAction: EcoAction;
  id: Scalars['Float'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addEcoActionsToGroup: Group;
  addFriend: User;
  addProof: Scalars['String'];
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
  createUserEcoAction: Scalars['String'];
  deleteEcoAction: Scalars['Boolean'];
  deleteLike: Scalars['Boolean'];
  login: Scalars['String'];
  logout: Scalars['String'];
  removeFriend: Scalars['String'];
  removeUserFromGroup: Group;
  sendNotification: Notification;
  updateEcoAction: EcoAction;
};


export type MutationAddEcoActionsToGroupArgs = {
  data: GroupInputAddEcoActions;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationAddProofArgs = {
  data: UserEcoActionInputAddProof;
};


export type MutationAddUserToGroupArgs = {
  data: GroupInputAddOneUser;
};


export type MutationAddUsersToCompanyArgs = {
  companyId: Scalars['Int'];
  users: Array<Scalars['Int']>;
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
  ecoActionId: Scalars['Int'];
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
  id: Scalars['Int'];
};


export type MutationDeleteLikeArgs = {
  ecoActionId: Scalars['Int'];
};


export type MutationLoginArgs = {
  data: UserInputLogin;
};


export type MutationRemoveFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationRemoveUserFromGroupArgs = {
  data: GroupInputAddOneUser;
};


export type MutationSendNotificationArgs = {
  data: NotificationInputCreation;
};


export type MutationUpdateEcoActionArgs = {
  data: EcoActionInputCreation;
  id: Scalars['Int'];
};

export type Notification = {
  __typename?: 'Notification';
  group?: Maybe<Group>;
  id: Scalars['Float'];
  receiver: User;
  sender: User;
  status: Scalars['String'];
  type: Scalars['String'];
};

export type NotificationInputCreation = {
  groupId?: InputMaybe<Scalars['Float']>;
  receiverId: Scalars['Float'];
  type: Scalars['String'];
};

export type NotificationInputStatusChange = {
  notificationId: Scalars['Float'];
  status: Scalars['String'];
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
  getNumberLikes: Scalars['Float'];
  getPopularFreeEcoActions: Array<EcoAction>;
  getTeamByGroup: Array<Team>;
  getTotalPossiblePoints: Scalars['Int'];
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
  isLiked: Scalars['Boolean'];
  users: Array<User>;
};


export type QueryGetCommentsForGroupArgs = {
  groupId: Scalars['Float'];
};


export type QueryGetEcoActionbyIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetGroupArgs = {
  groupId: Scalars['Float'];
};


export type QueryGetMaxValidationPointsArgs = {
  ecoActionId: Scalars['Int'];
};


export type QueryGetNumberLikesArgs = {
  ecoActionId: Scalars['Int'];
};


export type QueryGetTeamByGroupArgs = {
  groupId: Scalars['Float'];
};


export type QueryGetTotalPossiblePointsArgs = {
  ecoAactionIds: Array<Scalars['Int']>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserEcoActionArgs = {
  ecoActionId: Scalars['Int'];
  groupId: Scalars['Int'];
};


export type QueryGetUserEcoActionsByGroupIdArgs = {
  groupId: Scalars['Int'];
};


export type QueryGetUsersByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetUsersByTeamArgs = {
  teamId: Scalars['Float'];
};


export type QueryGetValidationArgs = {
  id: Scalars['Int'];
};


export type QueryGetValidationsByEcoActionArgs = {
  ecoActionId: Scalars['Int'];
};


export type QueryIsLikedArgs = {
  ecoActionId: Scalars['Int'];
};

export type Team = {
  __typename?: 'Team';
  group: Group;
  id: Scalars['Float'];
  name: Scalars['String'];
  users?: Maybe<Array<User>>;
};

export type TeamInputAddUsers = {
  teamId: Scalars['Int'];
  userIds: Array<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  company?: Maybe<Company>;
  createdCompany?: Maybe<Company>;
  createdEcoActions: Array<EcoAction>;
  createdGroups: Array<Group>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  friends?: Maybe<Array<User>>;
  groups?: Maybe<Array<Group>>;
  id: Scalars['Float'];
  lastName: Scalars['String'];
  likes: Array<LikeEcoAction>;
  password: Scalars['String'];
  relatedEcoActions: Array<UserEcoAction>;
  role: Scalars['String'];
  subscriptionType: Scalars['String'];
  teams?: Maybe<Team>;
};

export type UserEcoAction = {
  __typename?: 'UserEcoAction';
  ecoAction: EcoAction;
  groupId: Scalars['Int'];
  id: Scalars['Float'];
  points?: Maybe<Scalars['Float']>;
  proof?: Maybe<Scalars['String']>;
  user: User;
};

export type UserEcoActionInputAddPoints = {
  ecoActionId: Scalars['Int'];
  groupId: Scalars['Int'];
  points: Scalars['Int'];
  proof?: InputMaybe<Scalars['String']>;
};

export type UserEcoActionInputAddProof = {
  proof: Scalars['String'];
  userEcoActionId: Scalars['Float'];
};

export type UserInputLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserInputSubscribe = {
  company?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
  subscriptionType?: InputMaybe<Scalars['String']>;
};

export type Validation = {
  __typename?: 'Validation';
  ecoAction: EcoAction;
  id: Scalars['Float'];
  name: Scalars['String'];
  points: Scalars['Float'];
};

export type CreateUserEcoActionMutationVariables = Exact<{
  data: UserEcoActionInputAddPoints;
}>;


export type CreateUserEcoActionMutation = { __typename?: 'Mutation', createUserEcoAction: string };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string, subscriptionType: string, friends?: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, groups?: Array<{ __typename?: 'Group', id: number }> | null }> | null, groups?: Array<{ __typename?: 'Group', startDate: any, endDate: any, name: string, challengeName: string, id: number }> | null, createdEcoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, description: string }>, company?: { __typename?: 'Company', id: number, name: string, users: Array<{ __typename?: 'User', id: number }> } | null } };

export type GetGroupQueryVariables = Exact<{
  groupId: Scalars['Float'];
}>;


export type GetGroupQuery = { __typename?: 'Query', getGroup: { __typename?: 'Group', id: number, name: string, challengeName: string, startDate: any, endDate: any, author: { __typename?: 'User', id: number, firstName: string, lastName: string }, users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }>, ecoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, description: string, likes: number, validations: Array<{ __typename?: 'Validation', points: number, id: number }> }>, teams: Array<{ __typename?: 'Team', id: number, name: string, users?: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> | null }> } };

export type GetMaxValidationPointsQueryVariables = Exact<{
  ecoActionId: Scalars['Int'];
}>;


export type GetMaxValidationPointsQuery = { __typename?: 'Query', getMaxValidationPoints: { __typename?: 'Validation', id: number, points: number } };

export type GetUserEcoActionQueryVariables = Exact<{
  groupId: Scalars['Int'];
  ecoActionId: Scalars['Int'];
}>;


export type GetUserEcoActionQuery = { __typename?: 'Query', getUserEcoAction: { __typename?: 'UserEcoAction', id: number, proof?: string | null, points?: number | null, groupId: number, ecoAction: { __typename?: 'EcoAction', name: string, description: string, likes: number } } };

export type GetUserEcoActionsByGroupIdQueryVariables = Exact<{
  groupId: Scalars['Int'];
}>;


export type GetUserEcoActionsByGroupIdQuery = { __typename?: 'Query', getUserEcoActionsByGroupId: Array<{ __typename?: 'UserEcoAction', id: number, groupId: number, points?: number | null, user: { __typename?: 'User', id: number } }> };

export type GetUserGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserGroupsQuery = { __typename?: 'Query', getUserGroups: Array<{ __typename?: 'Group', id: number, challengeName: string, startDate: any, name: string, endDate: any, users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }>, author: { __typename?: 'User', id: number, firstName: string, lastName: string }, ecoActions: Array<{ __typename?: 'EcoAction', id: number, name: string }> }> };

export type GetValidationsByEcoActionQueryVariables = Exact<{
  ecoActionId: Scalars['Int'];
}>;


export type GetValidationsByEcoActionQuery = { __typename?: 'Query', getValidationsByEcoAction: Array<{ __typename?: 'Validation', id: number, points: number }> };

export type LoginMutationVariables = Exact<{
  loginData: UserInputLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };


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
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    firstName
    lastName
    email
    role
    subscriptionType
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
    mutation logout {
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