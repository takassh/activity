export type User = {
  object: string;
  id: string;
  user_type?: UserType;
  name?: string;
  avator_url?: string;
};

export type UserType = Person | Bot;

export type Person = {
  email: string;
};

export type Bot = {
  owner: OwnerType;
  workspace_name: string;
};

export type OwnerType = Workspace | User;

export type Workspace = {
  workspace: boolean;
};
