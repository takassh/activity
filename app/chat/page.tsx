import { getAccessToken, getSession } from '@auth0/nextjs-auth0';
import { Box, Button, Flex, Link, Stack, Text } from '@chakra-ui/react';
import { Metadata } from 'next';
import ChatBox from './chat_box';

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat with Takashi AI',
  openGraph: {
    images: 'https://bucket.takassh.com/logo.jpg',
  },
};

export default async function Page() {
  const session = await getSession();
  let accessToken = '';
  if (session) {
    accessToken = (await getAccessToken()).accessToken ?? '';
  }

  return (
    <Stack m={[4, 16]}>
      <Flex
        direction="row"
        alignItems="baseline"
        rounded="md"
        width="full"
        padding={['2', '4']}
        bgColor={'notion_default'}
      >
        <Text as="span">📣</Text>
        <Box ml={[2, 4]}>
          <Text fontSize={['xs', 'md']} whiteSpace="pre-line">
            {`Welcome! 
            You can talk with my LLM, takashi AI. Now he can understand only English.
            I've fed him blog posts from this site.
        E.g. "Who are you?" or "What technologies is this site using?"`}
          </Text>
        </Box>
      </Flex>
      {accessToken == '' ? (
        <Link href="/api/auth/login?returnTo=/chat">
          <Button w="100%" colorScheme="blue">
            You need to log in to chat with him
          </Button>
        </Link>
      ) : (
        <>
          {accessToken && (
            <Link href="/api/auth/logout">
              <Button w="100%" size={['xs', 'sm']}>
                Log out
              </Button>
            </Link>
          )}
          <ChatBox token={accessToken} mt={[4, 16]} />
        </>
      )}
    </Stack>
  );
}
