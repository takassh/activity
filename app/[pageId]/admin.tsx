'use client';
import { ToolTipIconModal } from '@/app/ui/tool_tip_icon_modal';
import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import { faImage, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { generateSummary } from '../api/action';
import { WSResponse } from '../api/response';

export function AdminComponent({
  pageId,
  title,
  body,
  api_key,
}: {
  pageId: string;
  title: string;
  body: string;
  api_key: string;
}) {
  let [isGenerating, setIsGenerating] = useState(false);
  let router = useRouter();
  const { lastMessage, readyState, sendJsonMessage } = useWebSocket(
    `wss://takassh.shuttleapp.rs/ws`,
  );

  useEffect(() => {
    if (lastMessage?.data !== undefined) {
      const wsResponse = JSON.parse(lastMessage?.data) as WSResponse;

      if (
        wsResponse.action === 'auth' &&
        wsResponse.message === 'authenticated'
      ) {
        sendJsonMessage({
          action: 'generate_cover_image',
          id: pageId,
          body: { prompt: `An attractive image for \"${title}\"` },
        });
        return;
      }

      if (
        wsResponse.action === 'generate_cover_image' &&
        wsResponse.message === 'success'
      ) {
        setIsGenerating(false);
        router.refresh();
        return;
      }
    }
  }, [lastMessage, pageId, router, sendJsonMessage, title]);

  return (
    <HStack mt={4} spacing={4}>
      <ToolTipIconModal title="" icon={faImage} fontSize={['md', 'xl']}>
        <Stack>
          <Text>Do you really want to generate a cover image?</Text>
          <Button
            onClick={async () => {
              if (readyState !== ReadyState.OPEN) return;
              setIsGenerating(true);
              sendJsonMessage({ action: 'auth', api_key: api_key });
            }}
            colorScheme="blue"
            isDisabled={readyState !== ReadyState.OPEN}
            isLoading={isGenerating}
          >
            Generate
          </Button>
        </Stack>
      </ToolTipIconModal>
      <ToolTipIconModal title="" icon={faPencil} fontSize={['md', 'xl']}>
        <Stack>
          <Text>Do you really want to generate summary?</Text>
          <Button
            onClick={async () => {
              setIsGenerating(true);
              await generateSummary(pageId, body);
              setIsGenerating(false);
              router.refresh();
            }}
            colorScheme="blue"
            isLoading={isGenerating}
          >
            Generate
          </Button>
        </Stack>
      </ToolTipIconModal>
    </HStack>
  );
}
