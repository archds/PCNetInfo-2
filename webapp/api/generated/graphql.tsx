import * as Apollo from '@apollo/client'
import { gql } from '@apollo/client'

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AllComputerInput = {
  filter?: InputMaybe<FilterInput>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<SortField>;
};

export type Building = {
  __typename?: 'Building';
  house: Scalars['String'];
  id: Scalars['ID'];
  street: Scalars['String'];
};

export type BuildingInput = {
  house: Scalars['String'];
  street: Scalars['String'];
};

export type CPU = {
  __typename?: 'CPU';
  clock?: Maybe<Scalars['Int']>;
  cores?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  threads?: Maybe<Scalars['Int']>;
};

export type CPUInput = {
  clock?: InputMaybe<Scalars['Int']>;
  cores?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  threads?: InputMaybe<Scalars['Int']>;
};

export type Computer = {
  __typename?: 'Computer';
  comment?: Maybe<Scalars['String']>;
  cpu?: Maybe<CPU>;
  domain?: Maybe<Scalars['String']>;
  formFactor?: Maybe<FormFactor>;
  id: Scalars['ID'];
  ip?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  os?: Maybe<OS>;
  ram?: Maybe<Scalars['Int']>;
  serial?: Maybe<Scalars['String']>;
  type: ComputerType;
  updated?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  username?: Maybe<Scalars['String']>;
  videocard?: Maybe<Videocard>;
};

export enum ComputerType {
  DESKTOP = 'DESKTOP',
  LAPTOP = 'LAPTOP'
}

export type CreateComputerInput = {
  cpu?: InputMaybe<CPUInput>;
  label: Scalars['String'];
  name: Scalars['String'];
  os?: InputMaybe<OSInput>;
  ram?: InputMaybe<Scalars['Int']>;
  serial?: InputMaybe<Scalars['String']>;
  type: ComputerType;
};

export type FilterInput = {
  formFactor?: InputMaybe<FormFactor>;
  location?: InputMaybe<FilterValue>;
  serialNumber?: InputMaybe<FilterValue>;
};

export enum FilterValue {
  NOT_SPECIFIED = 'NOT_SPECIFIED',
  SPECIFIED = 'SPECIFIED'
}

export enum FormFactor {
  ATX = 'ATX',
  mATX = 'mATX'
}

export type Location = {
  __typename?: 'Location';
  building: Building;
  cabinet: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  employees: Array<Maybe<User>>;
  floor?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
};

export type LocationInput = {
  building: BuildingInput;
  cabinet: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  employees?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  floor?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComputer: Computer;
  createLocation: Location;
  createUser: User;
  deleteComputer: Unit;
  deleteLocation: Unit;
  deleteUser: Unit;
  updateComputer: Computer;
  updateLocation: Location;
  updateUser: User;
};


export type MutationcreateComputerArgs = {
  input: CreateComputerInput;
};


export type MutationcreateLocationArgs = {
  input: LocationInput;
};


export type MutationcreateUserArgs = {
  input: UserInput;
};


export type MutationdeleteComputerArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationdeleteLocationArgs = {
  id: Scalars['ID'];
};


export type MutationdeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationupdateComputerArgs = {
  id: Scalars['ID'];
  input: UpdateComputerInput;
};


export type MutationupdateLocationArgs = {
  id: Scalars['ID'];
  input: LocationInput;
};


export type MutationupdateUserArgs = {
  id: Scalars['ID'];
  input: UserInput;
};

export type OS = {
  __typename?: 'OS';
  architecture?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type OSInput = {
  architecture?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  computer?: Maybe<Computer>;
  computers: Array<Computer>;
  hello: Scalars['String'];
  locations: Array<Maybe<Location>>;
  users: Array<Maybe<User>>;
};


export type QuerycomputerArgs = {
  id: Scalars['ID'];
};


export type QuerycomputersArgs = {
  input?: InputMaybe<AllComputerInput>;
};

export type RAMInput = {
  size?: InputMaybe<Scalars['Int']>;
};

export enum SortField {
  CPU = 'CPU',
  LABEL = 'LABEL',
  MEMORY = 'MEMORY',
  SERIAL = 'SERIAL'
}

export enum Unit {
  UNIT = 'UNIT'
}

export type UpdateComputerInput = {
  formFactor?: InputMaybe<FormFactor>;
  name?: InputMaybe<Scalars['String']>;
  ram?: InputMaybe<Scalars['Int']>;
  serial?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ComputerType>;
  user?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  computer?: Maybe<Computer>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

export type UserInput = {
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

export type Videocard = {
  __typename?: 'Videocard';
  memory?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type CreateComputerMutationVariables = Exact<{
  input: CreateComputerInput;
}>;


export type CreateComputerMutation = { __typename?: 'Mutation', createComputer: { __typename?: 'Computer', name: string } };

export type DeleteComputersMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type DeleteComputersMutation = { __typename?: 'Mutation', deleteComputer: Unit };

export type UpdateComputerMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateComputerInput;
}>;


export type UpdateComputerMutation = { __typename?: 'Mutation', updateComputer: { __typename?: 'Computer', name: string } };

export type ComputerQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ComputerQuery = {
  __typename?: 'Query', computer?: {
    __typename?: 'Computer', id: string, type: ComputerType, name: string, domain?: string | null | undefined, username?: string | null | undefined, serial?: string | null | undefined, ip?: string | null | undefined, comment?: string | null | undefined, label?: string | null | undefined, location?: string | null | undefined, updated?: string | null | undefined, formFactor?: FormFactor | null | undefined, ram?: number | null | undefined, user?: { __typename?: 'User', id: string, firstName: string, lastName?: string | null | undefined, role?: string | null | undefined } | null | undefined, os?: { __typename?: 'OS', name?: string | null | undefined, architecture?: string | null | undefined } | null | undefined, cpu?: { __typename?: 'CPU', name?: string | null | undefined, clock?: number | null | undefined, cores?: number | null | undefined, threads?: number | null | undefined } | null | undefined, videocard?: { __typename?: 'Videocard', name?: string | null | undefined, memory?: number | null | undefined } | null | undefined
  } | null | undefined
};

export type OSFragment = { __typename?: 'Computer', os?: { __typename?: 'OS', name?: string | null | undefined, architecture?: string | null | undefined } | null | undefined };

export type CPUFragment = { __typename?: 'Computer', cpu?: { __typename?: 'CPU', name?: string | null | undefined, clock?: number | null | undefined, cores?: number | null | undefined, threads?: number | null | undefined } | null | undefined };

export type VideocardFragment = { __typename?: 'Computer', videocard?: { __typename?: 'Videocard', name?: string | null | undefined, memory?: number | null | undefined } | null | undefined };

export type ComputersQueryVariables = Exact<{
  filter?: InputMaybe<FilterInput>;
  sorting?: InputMaybe<SortField>;
  search?: InputMaybe<Scalars['String']>;
}>;


export type ComputersQuery = { __typename?: 'Query', computers: Array<{ __typename?: 'Computer', id: string, name: string, type: ComputerType, label?: string | null | undefined, serial?: string | null | undefined, location?: string | null | undefined }> };

export const OSFragmentDoc = gql`
  fragment OS on Computer {
    os {
      name
      architecture
    }
  }
`
export const CPUFragmentDoc = gql`
  fragment CPU on Computer {
    cpu {
      name
      clock
      cores
      threads
    }
  }
`
export const VideocardFragmentDoc = gql`
  fragment Videocard on Computer {
    videocard {
      name
      memory
    }
  }
`
export const CreateComputerDocument = gql`
  mutation CreateComputer($input: CreateComputerInput!) {
    createComputer(input: $input) {
      name
    }
  }
`
export type CreateComputerMutationFn = Apollo.MutationFunction<CreateComputerMutation, CreateComputerMutationVariables>;

/**
 * __useCreateComputerMutation__
 *
 * To run a mutation, you first call `useCreateComputerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComputerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComputerMutation, { data, loading, error }] = useCreateComputerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateComputerMutation(baseOptions?: Apollo.MutationHookOptions<CreateComputerMutation, CreateComputerMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateComputerMutation, CreateComputerMutationVariables>(CreateComputerDocument, options)
}
export type CreateComputerMutationHookResult = ReturnType<typeof useCreateComputerMutation>;
export type CreateComputerMutationResult = Apollo.MutationResult<CreateComputerMutation>;
export type CreateComputerMutationOptions = Apollo.BaseMutationOptions<CreateComputerMutation, CreateComputerMutationVariables>;
export const DeleteComputersDocument = gql`
  mutation DeleteComputers($ids: [ID!]!) {
    deleteComputer(ids: $ids)
  }
`
export type DeleteComputersMutationFn = Apollo.MutationFunction<DeleteComputersMutation, DeleteComputersMutationVariables>;

/**
 * __useDeleteComputersMutation__
 *
 * To run a mutation, you first call `useDeleteComputersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComputersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteComputersMutation, { data, loading, error }] = useDeleteComputersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteComputersMutation(baseOptions?: Apollo.MutationHookOptions<DeleteComputersMutation, DeleteComputersMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteComputersMutation, DeleteComputersMutationVariables>(
      DeleteComputersDocument,
      options,
  )
}
export type DeleteComputersMutationHookResult = ReturnType<typeof useDeleteComputersMutation>;
export type DeleteComputersMutationResult = Apollo.MutationResult<DeleteComputersMutation>;
export type DeleteComputersMutationOptions = Apollo.BaseMutationOptions<DeleteComputersMutation, DeleteComputersMutationVariables>;
export const UpdateComputerDocument = gql`
  mutation UpdateComputer($id: ID!, $input: UpdateComputerInput!) {
    updateComputer(id: $id, input: $input) {
      name
    }
  }
`
export type UpdateComputerMutationFn = Apollo.MutationFunction<UpdateComputerMutation, UpdateComputerMutationVariables>;

/**
 * __useUpdateComputerMutation__
 *
 * To run a mutation, you first call `useUpdateComputerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComputerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComputerMutation, { data, loading, error }] = useUpdateComputerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateComputerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateComputerMutation, UpdateComputerMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateComputerMutation, UpdateComputerMutationVariables>(UpdateComputerDocument, options)
}
export type UpdateComputerMutationHookResult = ReturnType<typeof useUpdateComputerMutation>;
export type UpdateComputerMutationResult = Apollo.MutationResult<UpdateComputerMutation>;
export type UpdateComputerMutationOptions = Apollo.BaseMutationOptions<UpdateComputerMutation, UpdateComputerMutationVariables>;
export const ComputerDocument = gql`
  query Computer($id: ID!) {
    computer(id: $id) {
      id
      type
      name
      domain
      username
      serial
      ip
      comment
      label
      user {
        id
        firstName
        lastName
        role
      }
      location
      updated
      formFactor
      ram
      ...OS
      ...CPU
      ...Videocard
    }
  }
  ${OSFragmentDoc}
  ${CPUFragmentDoc}
${VideocardFragmentDoc}`;

/**
 * __useComputerQuery__
 *
 * To run a query within a React component, call `useComputerQuery` and pass it any options that fit your needs.
 * When your component renders, `useComputerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComputerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useComputerQuery(baseOptions: Apollo.QueryHookOptions<ComputerQuery, ComputerQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ComputerQuery, ComputerQueryVariables>(ComputerDocument, options)
}
export function useComputerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComputerQuery, ComputerQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ComputerQuery, ComputerQueryVariables>(ComputerDocument, options)
}
export type ComputerQueryHookResult = ReturnType<typeof useComputerQuery>;
export type ComputerLazyQueryHookResult = ReturnType<typeof useComputerLazyQuery>;
export type ComputerQueryResult = Apollo.QueryResult<ComputerQuery, ComputerQueryVariables>;
export const ComputersDocument = gql`
  query Computers($filter: FilterInput, $sorting: SortField, $search: String) {
    computers(input: {filter: $filter, sort: $sorting, search: $search}) {
      id
      name
      type
      label
      serial
      location
    }
  }
`

/**
 * __useComputersQuery__
 *
 * To run a query within a React component, call `useComputersQuery` and pass it any options that fit your needs.
 * When your component renders, `useComputersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComputersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sorting: // value for 'sorting'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useComputersQuery(baseOptions?: Apollo.QueryHookOptions<ComputersQuery, ComputersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ComputersQuery, ComputersQueryVariables>(ComputersDocument, options)
}
export function useComputersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ComputersQuery, ComputersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ComputersQuery, ComputersQueryVariables>(ComputersDocument, options)
}
export type ComputersQueryHookResult = ReturnType<typeof useComputersQuery>;
export type ComputersLazyQueryHookResult = ReturnType<typeof useComputersLazyQuery>;
export type ComputersQueryResult = Apollo.QueryResult<ComputersQuery, ComputersQueryVariables>;