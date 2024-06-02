'use client';
import { ToolTipIconModal } from '@/app/ui/tool_tip_icon_modal';
import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import { faImage, faPencil } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { revalidate } from '../api/action';

export function AdminComponent({
  pageId,
  title,
  body,
  token,
}: {
  pageId: string;
  title: string;
  body: string;
  token: string;
}) {
  let [isGenerating, setIsGenerating] = useState(false);
  let router = useRouter();

  return (
    <HStack mt={4} spacing={4}>
      <ToolTipIconModal title="" icon={faImage} fontSize={['md', 'xl']}>
        <Stack>
          <Text>Do you really want to generate a cover image?</Text>
          <Button
            onClick={async () => {
              setIsGenerating(true);
              await generateCoverImage(token, pageId, title);
              await revalidate(`page/${pageId}`);
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
      <ToolTipIconModal title="" icon={faPencil} fontSize={['md', 'xl']}>
        <Stack>
          <Text>Do you really want to generate summary?</Text>
          <Button
            onClick={async () => {
              setIsGenerating(true);
              await generateSummary(token, pageId, body);
              await revalidate(`page/${pageId}`);
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

async function generateSummary(
  token: string,
  pageId: string,
  body: string,
): Promise<void> {
  await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URI + `/pages/${pageId}/generate-summary`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: body,
      }),
    },
  );
}

async function generateCoverImage(
  token: string,
  pageId: string,
  title: string,
): Promise<void> {
  await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URI +
      `/pages/${pageId}/generate-cover-image`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `A cool cover image which represents a concept of \"${title}\"`,
      }),
    },
  );
}
