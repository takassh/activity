'use client';
import { Box, BoxProps, FormControl, Input, Stack } from '@chakra-ui/react';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import { useState } from 'react';
import {
  Debug,
  SearchSSERMessage,
  SearchSSEResponse,
  isSearchSSEDebug,
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
  const [sending, setSending] = useState(false);
  const [session, setSession] = useState<string>();
  const [debugs, setDebugs] = useState<string[]>([]);

  return (
    <Box {...props}>
      <Stack spacing={[4, 8]}>
        {messages.map((message, index) => (
          <Bubble
            key={index}
            message={message.content}
            pages={message.pages}
            debug={
              message.role === 'assistant' ? debugs[(index - 1) / 2] : undefined
            }
            isLLM={message.role === 'assistant'}
          />
        ))}
      </Stack>
      <Box position="sticky" bottom={4} zIndex={100} bg="bg" mt={[4, 16]}>
        <Formik
          initialValues={{ prompt: '' }}
          onSubmit={async (values, actions) => {
            const prompt = values.prompt;
            let newMessages = messages;
            newMessages.push({ role: 'user', content: prompt, pages: [] });
            setMessages(newMessages);
            setSending(true);

            new Promise(async () => {
              let responseMessage = '';
              const [pages, returnSession, returnDebug] = await search(
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
              setDebugs([...debugs, returnDebug?.context ?? '']);
              setSending(false);
              values.prompt = '';
            });
          }}
        >
          {(props) => (
            <Form>
              <Field
                name="prompt"
                validate={(value: string) => {
                  if (
                    value.replaceAll(RegExp(' +', 'g'), ' ').split(' ').length <
                    3
                  ) {
                    return 'Please enter a longer prompt';
                  }
                }}
              >
                {({ field, form }: FieldProps<string>) => {
                  return (
                    <FormControl>
                      <Input
                        disabled={sending}
                        placeholder="Ask Takashi AI whatever. What's on your mind?"
                        fontSize={['xs', 'md']}
                        noOfLines={5}
                        {...field}
                        mb={2}
                      />
                      <ErrorMessage name="prompt" />
                    </FormControl>
                  );
                }}
              </Field>
            </Form>
          )}
        </Formik>
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
): Promise<[Page[], string, Debug?]> {
  let pageIds: string[] = [];
  let return_pages: Page[] = [];
  let return_session = '';
  let return_debug = undefined;

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
  if (!reader) return [return_pages, return_session, return_debug];

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
          return [return_pages, return_session, return_debug];
        }
        const chunk = JSON.parse(json) as SearchSSEResponse;
        if (isSearchSSEPages(chunk)) {
          chunk.pages.forEach((page) => {
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
        if (isSearchSSEDebug(chunk)) {
          return_debug = chunk.debug;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return [return_pages, return_session, return_debug];
}
