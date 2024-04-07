'use server';

import { Block } from '../types/block';
import { Event } from '../types/event';
import { Page } from '../types/page';
import {
  GetBlockResponse,
  GetEventsResponse,
  GetPageResponse,
  GetPagesResponse,
  GetPostsResponse,
} from './response';

type Contents = Event | Page;

export async function getPosts(): Promise<Contents[]> {
  const response = await fetch(process.env.API_BASE_URI + '/posts');
  const json = (await response.json()) as GetPostsResponse;
  const posts = json.posts.map((post) => {
    return JSON.parse(post.contents);
  }) as Contents[];
  return posts;
}

export async function getPages(
  page: number,
  limit: number,
  category: string,
): Promise<Page[]> {
  const response = await fetch(
    process.env.API_BASE_URI +
      `/pages?page=${page}&limit=${limit}&category=${category}`,
  );
  const json = (await response.json()) as GetPagesResponse;
  const pages = json.pages.map((page) => {
    return JSON.parse(page.contents);
  }) as Page[];
  return pages;
}

export async function getPage(pageId: string): Promise<Page> {
  const response = await fetch(process.env.API_BASE_URI + `/pages/${pageId}`);
  const json = (await response.json()) as GetPageResponse;
  const page = JSON.parse(json.page.contents);
  return page;
}

export async function getBlock(pageId: string): Promise<Block[]> {
  const response = await fetch(process.env.API_BASE_URI + `/blocks/${pageId}`);
  const json = (await response.json()) as GetBlockResponse;
  const page = JSON.parse(json.block.contents) as Block[];
  return page;
}

export async function getEvents(page: number, limit: number): Promise<Event[]> {
  const response = await fetch(
    process.env.API_BASE_URI + `/events?page=${page}&limit=${limit}`,
  );
  const json = (await response.json()) as GetEventsResponse;
  const events = json.events.map((event) => {
    return JSON.parse(event.contents);
  }) as Event[];
  return events;
}
