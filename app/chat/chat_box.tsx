'use client';
import { Box, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import {
  SearchSSERMessage,
  SearchSSEResponse,
  isSearchSSEPages,
  isSearchSSERMessage,
} from '../api/response';
import { Page } from '../types/notion_page';
import { Bubble } from './bubble';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  pages: Page[];
};

export default function ChatBox(token: { token: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState('');
  const [sending, setSending] = useState(false);

  return (
    <Box m={[4, 16]}>
      <Stack>
        <Flex
          direction="row"
          alignItems="baseline"
          rounded="md"
          fontSize={['xs', 'sm']}
          width="full"
          padding={['2', '4']}
          bgColor={'notion_default'}
        >
          <Text as="span">📣</Text>
          <Box ml={[2, 4]}>
            <Text fontSize={'lg'}>
              Welcome! You can talk with my LLM here. Now it supports only
              English. For example, you can ask &quot;Who are you?&quot; or
              &quot;What type of concurrent programming do you know?&quot;
            </Text>
          </Box>
        </Flex>

        {messages.map((message, index) => (
          <Bubble
            key={index}
            message={message.content}
            pages={message.pages}
            isLLM={message.role === 'assistant'}
            mt={4}
            mb={4}
          />
        ))}
      </Stack>
      <Box position="sticky" bottom={4} zIndex={100} bg="bg" mt={16}>
        <form
          action={() => {
            if (prompt == '') return;
            let newMessages = messages;
            newMessages.push({ role: 'user', content: prompt, pages: [] });
            setMessages(newMessages);
            setSending(true);

            new Promise(async () => {
              let responseMessage = '';
              const pages = await search(
                token.token,
                prompt,
                messages,
                (response) => {
                  responseMessage += response.message;
                  setMessages([
                    ...messages,
                    { role: 'assistant', content: responseMessage, pages: [] },
                  ]);
                },
              );
              newMessages.push({
                role: 'assistant',
                content: responseMessage,
                pages: pages,
              });
              setMessages(newMessages);
              setSending(false);
              setPrompt('');
            });
          }}
        >
          <Input
            disabled={sending}
            placeholder="Ask LLM anyhing"
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
): Promise<Page[]> {
  let pageIds: string[] = [];
  let result: Page[] = [];

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URI + '/search/sse',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt, history: history }),
    },
  );

  const reader = response.body?.getReader();
  if (!reader) return result;

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
          return result;
        }
        const chunk = JSON.parse(json) as SearchSSEResponse;
        if (isSearchSSEPages(chunk)) {
          let pages = chunk.pages.map<Page>((page) => {
            return JSON.parse(page);
          });
          pages.forEach((page) => {
            if (!pageIds.includes(page.id)) {
              pageIds.push(page.id);
              result.push(page);
            }
          });
        }
        if (isSearchSSERMessage(chunk)) {
          callback(chunk);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return result;
}
