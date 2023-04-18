/**
 * Generated by @openapi-codegen
 *
 * @version 1.0
 */
export type User = {
  /*
   * @format email
   */
  email: string;
  fullname: string;
  image: string;
};

/**
 * @pattern [a-zA-Z0-9_-~:]+
 */
export type UserID = string;

export type UserWithID = User & {
  id: UserID;
};

/**
 * @format date-time
 * @x-go-type string
 */
export type DateTime = string;

/**
 * @pattern [a-zA-Z0-9_\-~]*
 */
export type APIKeyName = string;

/**
 * @pattern ^([a-zA-Z0-9][a-zA-Z0-9_\-~]+-)?[a-zA-Z0-9]{6}
 * @x-go-type auth.WorkspaceID
 */
export type WorkspaceID = string;

/**
 * @x-go-type auth.Role
 */
export type Role = "owner" | "maintainer";

export type WorkspaceMeta = {
  name: string;
  slug?: string;
};

export type Workspace = WorkspaceMeta & {
  id: WorkspaceID;
  memberCount: number;
  plan: "free" | "pro";
};

export type WorkspaceMember = {
  userId: UserID;
  fullname: string;
  /*
   * @format email
   */
  email: string;
  role: Role;
};

/**
 * @pattern [a-zA-Z0-9]+
 */
export type InviteID = string;

export type WorkspaceInvite = {
  inviteId: InviteID;
  /*
   * @format email
   */
  email: string;
  /*
   * @format date-time
   */
  expires: string;
  role: Role;
};

export type WorkspaceMembers = {
  members: WorkspaceMember[];
  invites: WorkspaceInvite[];
};

/**
 * @pattern ^ik_[a-zA-Z0-9]+
 */
export type InviteKey = string;

/**
 * Metadata of databases
 */
export type DatabaseMetadata = {
  /*
   * The machine-readable name of a database
   */
  name: string;
  /*
   * Region where this database is hosted
   */
  region: string;
  /*
   * The time this database was created
   */
  createdAt: DateTime;
  /*
   * @x-internal true
   */
  newMigrations?: boolean;
  /*
   * Metadata about the database for display in Xata user interfaces
   */
  ui?: {
    /*
     * The user-selected color for this database across interfaces
     */
    color?: string;
  };
};

export type ListDatabasesResponse = {
  /*
   * A list of databases in a Xata workspace
   */
  databases: DatabaseMetadata[];
};

/**
 * @maxLength 255
 * @minLength 1
 * @pattern [a-zA-Z0-9_\-~]+
 */
export type DBName = string;

/**
 * @maxLength 255
 * @minLength 1
 * @pattern [a-zA-Z0-9_\-~]+
 */
export type BranchName = string;

/**
 * @example {"repository":"github.com/my/repository","branch":"feature-login","stage":"testing","labels":["epic-100"]}
 * @x-go-type xata.BranchMetadata
 */
export type BranchMetadata = {
  /*
   * @minLength 1
   */
  repository?: string;
  branch?: BranchName;
  /*
   * @minLength 1
   */
  stage?: string;
  labels?: string[];
};

export type MigrationStatus = "completed" | "pending" | "failed";

/**
 * Github repository settings for this database (optional)
 */
export type DatabaseGithubSettings = {
  /*
   * Repository owner (user or organization)
   */
  owner: string;
  /*
   * Repository name
   */
  repo: string;
};

export type Region = {
  id: string;
};

export type ListRegionsResponse = {
  /*
   * A list of regions where databases can be created
   */
  regions: Region[];
};
