export type Event = {
  id: string;
  type: string;
  actor: Actor;
  repo: Repo;
  org?: Actor;
  payload: Payload;
  public: boolean;
  created_at: string;
};

export type Actor = {
  id: number;
  login: string;
  display_login?: string;
  gravatar_id?: string;
  url: string;
  avatar_url: string;
};

export type Repo = {
  id: number;
  name: string;
  url: string;
};

export type Payload = {
  action?: string;
  issue?: Issue;
  comment?: Comment;
  pages?: Page[];
};

export type Issue = {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  state_reason?: string;
  title: string;
  body?: string;
  user?: SimpleUser;
  labels: LabelOrString[];
  assignee?: SimpleUser;
  assignees?: SimpleUser[];
  milestone?: Milestone;
};

export type LabelOrString = Label | string;

export type Label = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description?: string;
  color: string;
  default: boolean;
};

export type SimpleUser = {
  name?: string;
  email?: string;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id?: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
};

export type Milestone = {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: string;
  title: string;
  description?: string;
  creator?: SimpleUser;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  due_on?: string;
};

export type Comment = {
  id: number;
  node_id: string;
  url: string;
  body: string;
  body_text: string;
  body_html: string;
  html_url: string;
  user?: SimpleUser;
  created_at: string;
  updated_at: string;
  issue_url: string;
  author_association: string;
  performed_via_github_app?: GitHubApp;
  reactions: ReactionRollup;
};

export type GitHubApp = {
  id: number;
  slug: string;
  node_id: string;
  owner?: SimpleUser;
  name: string;
  description?: string;
  external_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  permissions: Permissions;
  events: string[];
  installations_count: number;
  client_id: string;
  client_secret: string;
  webhook_secret?: string;
  pem: string;
};

export type Permissions = {
  issues: string;
  checks: string;
  metadata: string;
  contents: string;
  deployments: string;
};

export type ReactionRollup = {
  url: string;
  total_count: number;
  plus_one: number;
  minus_one: number;
  laugh: number;
  confused: number;
  heart: number;
  hooray: number;
  eyes: number;
  rocket: number;
};

export type Page = {
  page_name: string;
  title: string;
  summary?: string;
  action: string;
  sha: string;
  html_url: string;
};
