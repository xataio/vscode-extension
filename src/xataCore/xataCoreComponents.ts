/**
 * Generated by @openapi-codegen
 *
 * @version 1.0
 */
import type * as Fetcher from "./xataCoreFetcher";
import { xataCoreFetch, XataCoreFetcherExtraProps } from "./xataCoreFetcher";
import type * as Schemas from "./xataCoreSchemas";
import type * as Responses from "./xataCoreResponses";

export type GetUserError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type GetUserVariables = XataCoreFetcherExtraProps;

/**
 * Return details of the user making the request
 */
export const getUser = (variables: GetUserVariables) =>
  xataCoreFetch<Schemas.UserWithID, GetUserError, undefined, {}, {}, {}>({
    url: "/user",
    method: "get",
    ...variables,
  });

export type UpdateUserError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type UpdateUserVariables = {
  body: Schemas.User;
} & XataCoreFetcherExtraProps;

/**
 * Update user info
 */
export const updateUser = (variables: UpdateUserVariables) =>
  xataCoreFetch<Schemas.UserWithID, UpdateUserError, Schemas.User, {}, {}, {}>({
    url: "/user",
    method: "put",
    ...variables,
  });

export type DeleteUserError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type DeleteUserVariables = XataCoreFetcherExtraProps;

/**
 * Delete the user making the request
 */
export const deleteUser = (variables: DeleteUserVariables) =>
  xataCoreFetch<undefined, DeleteUserError, undefined, {}, {}, {}>({
    url: "/user",
    method: "delete",
    ...variables,
  });

export type GetUserAPIKeysError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type GetUserAPIKeysResponse = {
  keys: {
    name: string;
    createdAt: Schemas.DateTime;
  }[];
};

export type GetUserAPIKeysVariables = XataCoreFetcherExtraProps;

/**
 * Retrieve a list of existing user API keys
 */
export const getUserAPIKeys = (variables: GetUserAPIKeysVariables) =>
  xataCoreFetch<
    GetUserAPIKeysResponse,
    GetUserAPIKeysError,
    undefined,
    {},
    {},
    {}
  >({ url: "/user/keys", method: "get", ...variables });

export type CreateUserAPIKeyPathParams = {
  /*
   * API Key name
   */
  keyName: Schemas.APIKeyName;
};

export type CreateUserAPIKeyError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type CreateUserAPIKeyResponse = {
  name: string;
  key: string;
  createdAt: Schemas.DateTime;
};

export type CreateUserAPIKeyVariables = {
  pathParams: CreateUserAPIKeyPathParams;
} & XataCoreFetcherExtraProps;

/**
 * Create and return new API key
 */
export const createUserAPIKey = (variables: CreateUserAPIKeyVariables) =>
  xataCoreFetch<
    CreateUserAPIKeyResponse,
    CreateUserAPIKeyError,
    undefined,
    {},
    {},
    CreateUserAPIKeyPathParams
  >({ url: "/user/keys/{keyName}", method: "post", ...variables });

export type DeleteUserAPIKeyPathParams = {
  /*
   * API Key name
   */
  keyName: Schemas.APIKeyName;
};

export type DeleteUserAPIKeyError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type DeleteUserAPIKeyVariables = {
  pathParams: DeleteUserAPIKeyPathParams;
} & XataCoreFetcherExtraProps;

/**
 * Delete an existing API key
 */
export const deleteUserAPIKey = (variables: DeleteUserAPIKeyVariables) =>
  xataCoreFetch<
    undefined,
    DeleteUserAPIKeyError,
    undefined,
    {},
    {},
    DeleteUserAPIKeyPathParams
  >({ url: "/user/keys/{keyName}", method: "delete", ...variables });

export type GetWorkspacesListError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type GetWorkspacesListResponse = {
  workspaces: {
    id: Schemas.WorkspaceID;
    name: string;
    slug: string;
    role: Schemas.Role;
  }[];
};

export type GetWorkspacesListVariables = XataCoreFetcherExtraProps;

/**
 * Retrieve the list of workspaces the user belongs to
 */
export const getWorkspacesList = (variables: GetWorkspacesListVariables) =>
  xataCoreFetch<
    GetWorkspacesListResponse,
    GetWorkspacesListError,
    undefined,
    {},
    {},
    {}
  >({ url: "/workspaces", method: "get", ...variables });

export type CreateWorkspaceError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type CreateWorkspaceVariables = {
  body: Schemas.WorkspaceMeta;
} & XataCoreFetcherExtraProps;

/**
 * Creates a new workspace with the user requesting it as its single owner.
 */
export const createWorkspace = (variables: CreateWorkspaceVariables) =>
  xataCoreFetch<
    Schemas.Workspace,
    CreateWorkspaceError,
    Schemas.WorkspaceMeta,
    {},
    {},
    {}
  >({ url: "/workspaces", method: "post", ...variables });

export type GetWorkspacePathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
};

export type GetWorkspaceError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type GetWorkspaceVariables = {
  pathParams: GetWorkspacePathParams;
} & XataCoreFetcherExtraProps;

/**
 * Retrieve workspace info from a workspace ID
 */
export const getWorkspace = (variables: GetWorkspaceVariables) =>
  xataCoreFetch<
    Schemas.Workspace,
    GetWorkspaceError,
    undefined,
    {},
    {},
    GetWorkspacePathParams
  >({ url: "/workspaces/{workspaceId}", method: "get", ...variables });

export type UpdateWorkspacePathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
};

export type UpdateWorkspaceError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type UpdateWorkspaceVariables = {
  body: Schemas.WorkspaceMeta;
  pathParams: UpdateWorkspacePathParams;
} & XataCoreFetcherExtraProps;

/**
 * Update workspace info
 */
export const updateWorkspace = (variables: UpdateWorkspaceVariables) =>
  xataCoreFetch<
    Schemas.Workspace,
    UpdateWorkspaceError,
    Schemas.WorkspaceMeta,
    {},
    {},
    UpdateWorkspacePathParams
  >({ url: "/workspaces/{workspaceId}", method: "put", ...variables });

export type DeleteWorkspacePathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
};

export type DeleteWorkspaceError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type DeleteWorkspaceVariables = {
  pathParams: DeleteWorkspacePathParams;
} & XataCoreFetcherExtraProps;

/**
 * Delete the workspace with the provided ID
 */
export const deleteWorkspace = (variables: DeleteWorkspaceVariables) =>
  xataCoreFetch<
    undefined,
    DeleteWorkspaceError,
    undefined,
    {},
    {},
    DeleteWorkspacePathParams
  >({ url: "/workspaces/{workspaceId}", method: "delete", ...variables });

export type GetWorkspaceMembersListPathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
};

export type GetWorkspaceMembersListError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type GetWorkspaceMembersListVariables = {
  pathParams: GetWorkspaceMembersListPathParams;
} & XataCoreFetcherExtraProps;

/**
 * Retrieve the list of members of the given workspace
 */
export const getWorkspaceMembersList = (
  variables: GetWorkspaceMembersListVariables
) =>
  xataCoreFetch<
    Schemas.WorkspaceMembers,
    GetWorkspaceMembersListError,
    undefined,
    {},
    {},
    GetWorkspaceMembersListPathParams
  >({ url: "/workspaces/{workspaceId}/members", method: "get", ...variables });

export type UpdateWorkspaceMemberRolePathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
  /*
   * UserID
   */
  userId: Schemas.UserID;
};

export type UpdateWorkspaceMemberRoleError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type UpdateWorkspaceMemberRoleRequestBody = {
  role: Schemas.Role;
};

export type UpdateWorkspaceMemberRoleVariables = {
  body: UpdateWorkspaceMemberRoleRequestBody;
  pathParams: UpdateWorkspaceMemberRolePathParams;
} & XataCoreFetcherExtraProps;

/**
 * Update a workspace member role. Workspaces must always have at least one owner, so this operation will fail if trying to remove owner role from the last owner in the workspace.
 */
export const updateWorkspaceMemberRole = (
  variables: UpdateWorkspaceMemberRoleVariables
) =>
  xataCoreFetch<
    undefined,
    UpdateWorkspaceMemberRoleError,
    UpdateWorkspaceMemberRoleRequestBody,
    {},
    {},
    UpdateWorkspaceMemberRolePathParams
  >({
    url: "/workspaces/{workspaceId}/members/{userId}",
    method: "put",
    ...variables,
  });

export type RemoveWorkspaceMemberPathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
  /*
   * UserID
   */
  userId: Schemas.UserID;
};

export type RemoveWorkspaceMemberError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type RemoveWorkspaceMemberVariables = {
  pathParams: RemoveWorkspaceMemberPathParams;
} & XataCoreFetcherExtraProps;

/**
 * Remove the member from the workspace
 */
export const removeWorkspaceMember = (
  variables: RemoveWorkspaceMemberVariables
) =>
  xataCoreFetch<
    undefined,
    RemoveWorkspaceMemberError,
    undefined,
    {},
    {},
    RemoveWorkspaceMemberPathParams
  >({
    url: "/workspaces/{workspaceId}/members/{userId}",
    method: "delete",
    ...variables,
  });

export type InviteWorkspaceMemberPathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
};

export type InviteWorkspaceMemberError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
  | {
      status: 409;
      payload: Responses.SimpleError;
    }
>;

export type InviteWorkspaceMemberRequestBody = {
  /*
   * @format email
   */
  email: string;
  role: Schemas.Role;
};

export type InviteWorkspaceMemberVariables = {
  body: InviteWorkspaceMemberRequestBody;
  pathParams: InviteWorkspaceMemberPathParams;
} & XataCoreFetcherExtraProps;

/**
 * Invite some user to join the workspace with the given role
 */
export const inviteWorkspaceMember = (
  variables: InviteWorkspaceMemberVariables
) =>
  xataCoreFetch<
    Schemas.WorkspaceInvite,
    InviteWorkspaceMemberError,
    InviteWorkspaceMemberRequestBody,
    {},
    {},
    InviteWorkspaceMemberPathParams
  >({ url: "/workspaces/{workspaceId}/invites", method: "post", ...variables });

export type UpdateWorkspaceMemberInvitePathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
  /*
   * Invite identifier
   */
  inviteId: Schemas.InviteID;
};

export type UpdateWorkspaceMemberInviteError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
  | {
      status: 422;
      payload: Responses.SimpleError;
    }
>;

export type UpdateWorkspaceMemberInviteRequestBody = {
  role: Schemas.Role;
};

export type UpdateWorkspaceMemberInviteVariables = {
  body: UpdateWorkspaceMemberInviteRequestBody;
  pathParams: UpdateWorkspaceMemberInvitePathParams;
} & XataCoreFetcherExtraProps;

/**
 * This operation provides a way to update an existing invite. Updates are performed in-place; they do not change the invite link, the expiry time, nor do they re-notify the recipient of the invite.
 */
export const updateWorkspaceMemberInvite = (
  variables: UpdateWorkspaceMemberInviteVariables
) =>
  xataCoreFetch<
    Schemas.WorkspaceInvite,
    UpdateWorkspaceMemberInviteError,
    UpdateWorkspaceMemberInviteRequestBody,
    {},
    {},
    UpdateWorkspaceMemberInvitePathParams
  >({
    url: "/workspaces/{workspaceId}/invites/{inviteId}",
    method: "patch",
    ...variables,
  });

export type CancelWorkspaceMemberInvitePathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
  /*
   * Invite identifier
   */
  inviteId: Schemas.InviteID;
};

export type CancelWorkspaceMemberInviteError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type CancelWorkspaceMemberInviteVariables = {
  pathParams: CancelWorkspaceMemberInvitePathParams;
} & XataCoreFetcherExtraProps;

/**
 * This operation provides a way to cancel invites by deleting them. Already accepted invites cannot be deleted.
 */
export const cancelWorkspaceMemberInvite = (
  variables: CancelWorkspaceMemberInviteVariables
) =>
  xataCoreFetch<
    undefined,
    CancelWorkspaceMemberInviteError,
    undefined,
    {},
    {},
    CancelWorkspaceMemberInvitePathParams
  >({
    url: "/workspaces/{workspaceId}/invites/{inviteId}",
    method: "delete",
    ...variables,
  });

export type AcceptWorkspaceMemberInvitePathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
  /*
   * Invite Key (secret) for the invited user
   */
  inviteKey: Schemas.InviteKey;
};

export type AcceptWorkspaceMemberInviteError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type AcceptWorkspaceMemberInviteVariables = {
  pathParams: AcceptWorkspaceMemberInvitePathParams;
} & XataCoreFetcherExtraProps;

/**
 * Accept the invitation to join a workspace. If the operation succeeds the user will be a member of the workspace
 */
export const acceptWorkspaceMemberInvite = (
  variables: AcceptWorkspaceMemberInviteVariables
) =>
  xataCoreFetch<
    undefined,
    AcceptWorkspaceMemberInviteError,
    undefined,
    {},
    {},
    AcceptWorkspaceMemberInvitePathParams
  >({
    url: "/workspaces/{workspaceId}/invites/{inviteKey}/accept",
    method: "post",
    ...variables,
  });

export type ResendWorkspaceMemberInvitePathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
  /*
   * Invite identifier
   */
  inviteId: Schemas.InviteID;
};

export type ResendWorkspaceMemberInviteError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type ResendWorkspaceMemberInviteVariables = {
  pathParams: ResendWorkspaceMemberInvitePathParams;
} & XataCoreFetcherExtraProps;

/**
 * This operation provides a way to resend an Invite notification. Invite notifications can only be sent for Invites not yet accepted.
 */
export const resendWorkspaceMemberInvite = (
  variables: ResendWorkspaceMemberInviteVariables
) =>
  xataCoreFetch<
    undefined,
    ResendWorkspaceMemberInviteError,
    undefined,
    {},
    {},
    ResendWorkspaceMemberInvitePathParams
  >({
    url: "/workspaces/{workspaceId}/invites/{inviteId}/resend",
    method: "post",
    ...variables,
  });

export type GetDatabaseListPathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
};

export type GetDatabaseListError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
>;

export type GetDatabaseListVariables = {
  pathParams: GetDatabaseListPathParams;
} & XataCoreFetcherExtraProps;

/**
 * List all databases available in your Workspace.
 */
export const getDatabaseList = (variables: GetDatabaseListVariables) =>
  xataCoreFetch<
    Schemas.ListDatabasesResponse,
    GetDatabaseListError,
    undefined,
    {},
    {},
    GetDatabaseListPathParams
  >({ url: "/workspaces/{workspaceId}/dbs", method: "get", ...variables });

export type CreateDatabasePathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
  /*
   * The Database Name
   */
  dbName: Schemas.DBName;
};

export type CreateDatabaseError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
>;

export type CreateDatabaseResponse = {
  /*
   * @minLength 1
   */
  databaseName: string;
  branchName?: string;
  status: Schemas.MigrationStatus;
};

export type CreateDatabaseRequestBody = {
  /*
   * @minLength 1
   */
  branchName?: string;
  /*
   * @minLength 1
   */
  region: string;
  ui?: {
    color?: string;
  };
  metadata?: Schemas.BranchMetadata;
};

export type CreateDatabaseVariables = {
  body: CreateDatabaseRequestBody;
  pathParams: CreateDatabasePathParams;
} & XataCoreFetcherExtraProps;

/**
 * Create Database with identifier name
 */
export const createDatabase = (variables: CreateDatabaseVariables) =>
  xataCoreFetch<
    CreateDatabaseResponse,
    CreateDatabaseError,
    CreateDatabaseRequestBody,
    {},
    {},
    CreateDatabasePathParams
  >({
    url: "/workspaces/{workspaceId}/dbs/{dbName}",
    method: "put",
    ...variables,
  });

export type DeleteDatabasePathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
  /*
   * The Database Name
   */
  dbName: Schemas.DBName;
};

export type DeleteDatabaseError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type DeleteDatabaseResponse = {
  status: Schemas.MigrationStatus;
};

export type DeleteDatabaseVariables = {
  pathParams: DeleteDatabasePathParams;
} & XataCoreFetcherExtraProps;

/**
 * Delete a database and all of its branches and tables permanently.
 */
export const deleteDatabase = (variables: DeleteDatabaseVariables) =>
  xataCoreFetch<
    DeleteDatabaseResponse,
    DeleteDatabaseError,
    undefined,
    {},
    {},
    DeleteDatabasePathParams
  >({
    url: "/workspaces/{workspaceId}/dbs/{dbName}",
    method: "delete",
    ...variables,
  });

export type GetDatabaseMetadataPathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
  /*
   * The Database Name
   */
  dbName: Schemas.DBName;
};

export type GetDatabaseMetadataError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type GetDatabaseMetadataVariables = {
  pathParams: GetDatabaseMetadataPathParams;
} & XataCoreFetcherExtraProps;

/**
 * Retrieve metadata of the given database
 */
export const getDatabaseMetadata = (variables: GetDatabaseMetadataVariables) =>
  xataCoreFetch<
    Schemas.DatabaseMetadata,
    GetDatabaseMetadataError,
    undefined,
    {},
    {},
    GetDatabaseMetadataPathParams
  >({
    url: "/workspaces/{workspaceId}/dbs/{dbName}",
    method: "get",
    ...variables,
  });

export type UpdateDatabaseMetadataPathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
  /*
   * The Database Name
   */
  dbName: Schemas.DBName;
};

export type UpdateDatabaseMetadataError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
  | {
      status: 404;
      payload: Responses.SimpleError;
    }
>;

export type UpdateDatabaseMetadataRequestBody = {
  ui?: {
    /*
     * @minLength 1
     */
    color?: string;
  };
};

export type UpdateDatabaseMetadataVariables = {
  body?: UpdateDatabaseMetadataRequestBody;
  pathParams: UpdateDatabaseMetadataPathParams;
} & XataCoreFetcherExtraProps;

/**
 * Update the color of the selected database
 */
export const updateDatabaseMetadata = (
  variables: UpdateDatabaseMetadataVariables
) =>
  xataCoreFetch<
    Schemas.DatabaseMetadata,
    UpdateDatabaseMetadataError,
    UpdateDatabaseMetadataRequestBody,
    {},
    {},
    UpdateDatabaseMetadataPathParams
  >({
    url: "/workspaces/{workspaceId}/dbs/{dbName}",
    method: "patch",
    ...variables,
  });

export type ListRegionsPathParams = {
  /*
   * Workspace ID
   */
  workspaceId: Schemas.WorkspaceID;
};

export type ListRegionsError = Fetcher.ErrorWrapper<
  | {
      status: 400;
      payload: Responses.BadRequestError;
    }
  | {
      status: 401;
      payload: Responses.AuthError;
    }
>;

export type ListRegionsVariables = {
  pathParams: ListRegionsPathParams;
} & XataCoreFetcherExtraProps;

/**
 * List regions available to create a database on
 */
export const listRegions = (variables: ListRegionsVariables) =>
  xataCoreFetch<
    Schemas.ListRegionsResponse,
    ListRegionsError,
    undefined,
    {},
    {},
    ListRegionsPathParams
  >({ url: "/workspaces/{workspaceId}/regions", method: "get", ...variables });

export const operationsByTag = {
  users: { getUser, updateUser, deleteUser },
  authentication: { getUserAPIKeys, createUserAPIKey, deleteUserAPIKey },
  workspaces: {
    getWorkspacesList,
    createWorkspace,
    getWorkspace,
    updateWorkspace,
    deleteWorkspace,
    getWorkspaceMembersList,
    updateWorkspaceMemberRole,
    removeWorkspaceMember,
  },
  invites: {
    inviteWorkspaceMember,
    updateWorkspaceMemberInvite,
    cancelWorkspaceMemberInvite,
    acceptWorkspaceMemberInvite,
    resendWorkspaceMemberInvite,
  },
  databases: {
    getDatabaseList,
    createDatabase,
    deleteDatabase,
    getDatabaseMetadata,
    updateDatabaseMetadata,
    listRegions,
  },
};