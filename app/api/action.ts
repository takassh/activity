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

// export async function generateCoverImage(
//   pageId: string,
//   title: string,
// ): Promise<void> {
//   const session = await getSession();
//   await fetch(
//     process.env.API_BASE_URI + `/pages/${pageId}/generate-cover-image`,
//     {
//       method: 'POST',
//       signal: AbortSignal.timeout(20000),
//       headers: {
//         Authorization: session?.accessToken ?? '',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         prompt: `An attractive image for \"${title}\"`,
//       }),
//     },
//   );

//   revalidateTag(`page/${pageId}`);
// }

// export async function generateSummary(
//   pageId: string,
//   body: string,
// ): Promise<void> {
//   const session = await getSession();
//   await fetch(process.env.API_BASE_URI + `/pages/${pageId}/generate-summary`, {
//     method: 'POST',
//     headers: {
//       Authorization: session?.accessToken ?? '',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       text: body,
//     }),
//   });

//   revalidateTag(`page/${pageId}`);
// }

export async function revalidate(tag: string) {
  await revalidateTag(tag);
}
