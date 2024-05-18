'use client';
import { Box, BoxProps, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import {
  SearchSSERMessage,
  SearchSSEResponse,
  isSearchSSEPages,
  isSearchSSERMessage,
  isSearchSSESession,
} from '../api/response';
import { Page } from '../types/notion_page';
import { Bubble } from './bubble';

interface ChatBoxProps extends BoxProps {
  token: string;
}

type Message = {
  role: 'user' | 'assistant';
  content: string;
  pages: Page[];
};

export default function ChatBox({ token, ...props }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState('');
  const [sending, setSending] = useState(false);
  const [session, setSession] = useState<string>();

  return (
    <Box {...props}>
      <Stack spacing={[4, 8]}>
        {messages.map((message, index) => (
          <Bubble
            key={index}
            message={message.content}
            pages={message.pages}
            isLLM={message.role === 'assistant'}
          />
        ))}
      </Stack>
      <Box position="sticky" bottom={4} zIndex={100} bg="bg" mt={[4, 16]}>
        <form
          action={() => {
            if (prompt == '') return;
            let newMessages = messages;
            newMessages.push({ role: 'user', content: prompt, pages: [] });
            setMessages(newMessages);
            setSending(true);

            new Promise(async () => {
              let responseMessage = '';
              const [pages, returnSession] = await search(
                token,
                prompt,
                messages,
                (response) => {
                  responseMessage += response.message;
                  setMessages([
                    ...messages,
                    { role: 'assistant', content: responseMessage, pages: [] },
                  ]);
                },
                session,
              );
              newMessages.push({
                role: 'assistant',
                content: responseMessage,
                pages: pages,
              });
              setMessages(newMessages);
              setSession(returnSession);
              setSending(false);
              setPrompt('');
            });
          }}
        >
          <Input
            disabled={sending}
            placeholder="Ask Takashi AI whatever. What's on your mind?"
            noOfLines={5}
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value);
            }}
          />
        </form>
      </Box>
    </Box>
  );
}

async function search(
  token: string,
  prompt: string,
  history: Message[],
  callback: (text: SearchSSERMessage) => void,
  session?: string,
): Promise<[Page[], string]> {
  let pageIds: string[] = [];
  let return_pages: Page[] = [];
  let return_session = '';

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URI + '/search/sse',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        history: history,
        session: session,
      }),
    },
  );

  const reader = response.body?.getReader();
  if (!reader) return [return_pages, return_session];

  let decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    const lines = decoder.decode(value);
    const jsons = lines
      .split('data: ')
      .map((line) => line.trim())
      .filter((s) => s);

    for (const json of jsons) {
      try {
        if (json === '[DONE]') {
          return [return_pages, return_session];
        }
        const chunk = JSON.parse(json) as SearchSSEResponse;
        if (isSearchSSEPages(chunk)) {
          let pages = chunk.pages.map<Page>((page) => {
            return JSON.parse(page);
          });
          pages.forEach((page) => {
            if (!pageIds.includes(page.id)) {
              pageIds.push(page.id);
              return_pages.push(page);
            }
          });
        }
        if (isSearchSSERMessage(chunk)) {
          callback(chunk);
        }
        if (isSearchSSESession(chunk)) {
          return_session = chunk.session;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return [return_pages, return_session];
}
