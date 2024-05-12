'use server';

import { Metadata } from 'next';
import { parse } from 'node-html-parser';
import { Block } from '../types/block';
import { Event } from '../types/event';
import { isFileTypeExternal, isFileTypeHosted } from '../types/file';
import {
  IsPagePropertyTypeRichText,
  IsPagePropertyTypeTitle,
  Page,
} from '../types/notion_page';
import {
  GetBlockResponse,
  GetEventsResponse,
  GetPageResponse,
  GetPagesResponse,
  GetPostsResponse,
  OGPResponse,
} from './response';

type Contents = Event | Page;

export async function getPosts(): Promise<Contents[]> {
  const response = await fetch(process.env.API_BASE_URI + '/posts', {
    headers: { Authorization: process.env.API_KEY as string },
  });
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
    { headers: { Authorization: process.env.API_KEY as string } },
  );
  const json = (await response.json()) as GetPagesResponse;
  const pages = json.pages.map((page) => {
    return JSON.parse(page.contents);
  }) as Page[];
  return pages;
}

export async function getPage(pageId: string): Promise<Page> {
  const response = await fetch(process.env.API_BASE_URI + `/pages/${pageId}`, {
    next: { tags: [`page/${pageId}`] },
    headers: { Authorization: process.env.API_KEY as string },
  });
  const json = (await response.json()) as GetPageResponse;
  const page = JSON.parse(json.page.contents);
  return page;
}

export async function getBlock(pageId: string): Promise<Block[]> {
  const response = await fetch(process.env.API_BASE_URI + `/blocks/${pageId}`, {
    headers: { Authorization: process.env.API_KEY as string },
  });
  const json = (await response.json()) as GetBlockResponse;
  const page = JSON.parse(json.block.contents) as Block[];
  return page;
}

export async function getEvents(page: number, limit: number): Promise<Event[]> {
  const response = await fetch(
    process.env.API_BASE_URI + `/events?page=${page}&limit=${limit}`,
    { headers: { Authorization: process.env.API_KEY as string } },
  );
  const json = (await response.json()) as GetEventsResponse;
  const events = json.events.map((event) => {
    return JSON.parse(event.contents);
  }) as Event[];
  return events;
}

const allowedTags = [
  'title',
  'og:title',
  'twitter:title',
  'description',
  'og:description',
  'twitter:description',
  'og:image',
  'twitter:image',
  'icon',
  'apple-touch-icon',
  'shortcut icon',
];

export async function getOGP(url: string): Promise<OGPResponse> {
  const response = await fetch(url);
  const html = await response.text();

  const root = parse(html);
  const objectMap: { [key: string]: string } = {};

  root
    .querySelectorAll('meta')
    .forEach(({ attributes }: { attributes: { [key: string]: string } }) => {
      const property =
        attributes.property || attributes.name || attributes.href;
      if (!objectMap[property] && allowedTags.includes(property)) {
        objectMap[property] = attributes.content;
      }
    });

  root
    .querySelectorAll('link')
    .forEach(({ attributes }: { attributes: { [key: string]: string } }) => {
      const { rel, href } = attributes;
      if (rel && href && allowedTags.includes(rel)) {
        objectMap[rel] = href;
      }
    });

  // title, description, imageSrc
  const title =
    objectMap['og:title'] ||
    objectMap['twitter:title'] ||
    root.querySelector('title')?.innerText ||
    '';

  const description =
    objectMap['og:description'] || objectMap['description'] || '';

  let imageSrc = objectMap['og:image'] || objectMap['twitter:image'] || '';

  let favIconImage =
    objectMap['apple-touch-icon'] ||
    objectMap['icon'] ||
    objectMap['shortcut icon'] ||
    '';

  const _url = new URL(url);

  if (!imageSrc.startsWith('http')) {
    imageSrc = `${_url.protocol}//${_url.host}${imageSrc}`;
  }
  if (!favIconImage.startsWith('http')) {
    favIconImage = `${_url.protocol}//${_url.host}${favIconImage}`;
  }

  return {
    title,
    description,
    imageSrc,
    favIconImage,
  };
}

export async function getPagesMetadata(pageId: string): Promise<Metadata> {
  const page = await getPage(pageId);

  let title = '';
  let summary = '';
  let coverUrl = '';
  if (IsPagePropertyTypeTitle(page.properties.title)) {
    title = page.properties.title.title
      .map((text) => text.plain_text ?? '')
      .join('');
  }
  if (IsPagePropertyTypeRichText(page.properties.summary)) {
    summary = page.properties.summary.rich_text
      .map((text) => text.plain_text ?? '')
      .join('');
  }
  if (isFileTypeExternal(page.cover)) {
    coverUrl = page.cover.external.url;
  }
  if (isFileTypeHosted(page.cover)) {
    coverUrl = page.cover.file.url;
  }

  return {
    title: title,
    description: summary,
    openGraph: {
      images: [
        {
          url: coverUrl,
        },
      ],
    },
    twitter: {
      card: 'summary',
      creator: '@octozuki',
    },
  };
}
