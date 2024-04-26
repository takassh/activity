'use client';
import { generateCoverImage } from '@/app/api/action';
import { ToolTipIconModal } from '@/app/ui/tool_tip_icon_modal';
import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import { faEraser, faImage } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function AdminComponent({
  pageId,
  title,
}: {
  pageId: string;
  title: string;
}) {
  let [isGenerating, setIsGenerating] = useState(false);

  return (
    <HStack mt={4} spacing={4}>
      <ToolTipIconModal title="" icon={faImage} fontSize={['md', 'xl']}>
        <Stack>
          <Text>Do you really want to generate a cover image?</Text>
          <Button
            onClick={async () => {
              setIsGenerating(true);
              await generateCoverImage(pageId, title);
              setIsGenerating(false);
              useRouter().reload();
            }}
            colorScheme="blue"
            isLoading={isGenerating}
          >
            Generate
          </Button>
        </Stack>
      </ToolTipIconModal>
      <ToolTipIconModal title="" icon={faEraser} fontSize={['md', 'xl']}>
        <Stack>
          <Text>Do you really want to purge cache?</Text>
          <Button colorScheme="red" isDisabled>
            Purge
          </Button>
        </Stack>
      </ToolTipIconModal>
    </HStack>
  );
}
