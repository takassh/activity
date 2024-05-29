'use server';

import { revalidateTag } from 'next/cache';
import { ExecuteResponse } from './response';

const RUST_PLAYGROUND_BASE_URL = 'https://play.rust-lang.org';
export async function evaluate(code: string): Promise<ExecuteResponse> {
  const res = await fetch(`${RUST_PLAYGROUND_BASE_URL}/evaluate.json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      version: 'stable',
      optimize: '0',
      code: code,
      edition: '2021',
    }),
  });

  return res.json();
}

export async function nudge(page_id: string, content: string): Promise<void> {
  await fetch(process.env.API_BASE_URI + `/nudge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page_id: page_id,
      content: content,
    }),
  });
}

export async function revalidate(tag: string) {
  await revalidateTag(tag);
}
