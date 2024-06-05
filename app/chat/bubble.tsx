'use client';
import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { faBug, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isFileTypeExternal, isFileTypeHosted } from '../types/file';
import {
  IsPagePropertyTypeRichText,
  IsPagePropertyTypeTitle,
  Page,
} from '../types/notion_page';
import { OGP } from '../ui/ogp';
import { ToolTipIconModal } from '../ui/tool_tip_icon_modal';

export interface BubbleProps extends FlexProps {
  message: string;
  pages: Page[];
  debug?: string;
  isLLM?: boolean;
}

export function Bubble({
  message,
  pages,
  isLLM,
  debug,
  ...props
}: BubbleProps) {
  return (
    <Flex alignItems="top" {...props}>
      {isLLM ? (
        <Image
          borderRadius="full"
          boxSize={['30px', '40px']}
          src="/logo-circle-small.webp"
          alt="Home"
        />
      ) : (
        <Icon as={FontAwesomeIcon} icon={faUser} fontSize={['30px', '40px']} />
      )}
      <Stack ml={4} width="100%">
        <HStack>
          <Text as="b">{isLLM ? 'Takashi AI' : 'You'}</Text>
          {isLLM && debug && debug.trim() != "" && (
            <ToolTipIconModal
              title="Given context"
              ml={2}
              icon={faBug}
              fontSize={'md'}
            >
              <Text>{debug}</Text>
            </ToolTipIconModal>
          )}
        </HStack>
        <Text whiteSpace="pre-line">{message}</Text>
        {pages.length > 0 && (
          <Box>
            <Text mb={4}>Takashi AI referenced these pages:</Text>
            <Stack>
              {pages.map((page, i) => {
                let coverUrl = '';
                let title = '';
                let summary = '';

                if (isFileTypeExternal(page.cover)) {
                  coverUrl = page.cover.external.url;
                }
                if (isFileTypeHosted(page.cover)) {
                  coverUrl = page.cover.file.url;
                }
                if (IsPagePropertyTypeTitle(page.properties.title)) {
                  title = page.properties.title.title
                    .map((v) => v.plain_text)
                    .join('');
                }
                if (IsPagePropertyTypeRichText(page.properties.summary)) {
                  summary = page.properties.summary.rich_text
                    .map((v) => v.plain_text)
                    .join('');
                }

                const url = new URL(window.location.href);
                return (
                  <OGP
                    key={`ogp-${i}`}
                    host={url.hostname}
                    title={title}
                    summary={summary}
                    imageUrl={coverUrl}
                    faviconUrl={`${url.protocol}//${url.host}/favicon.ico`}
                    href={`/${page.id}`}
                  />
                );
              })}
            </Stack>
          </Box>
        )}
      </Stack>
    </Flex>
  );
}
