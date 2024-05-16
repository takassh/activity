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

export type OGPResponse = {
  title: string;
  description: string;
  imageSrc: string;
  favIconImage: string;
};

export type SearchSSEResponse = SearchSSERMessage | SearchSSEPageIds;

export type SearchSSERMessage = {
  message: string;
};

export type SearchSSEPageIds = {
  pages: string[];
};

export function isSearchSSERMessage(
  response: SearchSSEResponse,
): response is SearchSSERMessage {
  return (response as SearchSSERMessage).message !== undefined;
}

export function isSearchSSEPages(
  response: SearchSSEResponse,
): response is SearchSSEPageIds {
  return (response as SearchSSEPageIds).pages !== undefined;
}
