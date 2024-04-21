export type GetPostsResponse = {
  posts: Post[];
};

export type Post = {
  category: Category;
  contents: string;
};

export enum Category {
  Event,
  Page,
}

export type GetPagesResponse = {
  pages: Page[];
};

export type GetPageResponse = {
  page: Page;
};

export type Page = {
  contents: string;
};

export type GetBlockResponse = {
  block: Block;
};

export type Block = {
  parent_id: string;
  contents: string;
};

export type GetEventsResponse = {
  events: Event[];
};

export type Event = {
  contents: string;
};

export type ExecuteResponse = {
  result: string;
  error?: string;
};
