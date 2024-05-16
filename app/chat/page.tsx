import { getSession } from '@auth0/nextjs-auth0';
import { Text } from '@chakra-ui/react';
import ChatBox from './chat_box';

export default async function Page() {
  const session = await getSession();
  if (session?.accessToken == null) {
    return <Text>You need to login</Text>;
  }
  return <ChatBox token={session.accessToken} />;
}
