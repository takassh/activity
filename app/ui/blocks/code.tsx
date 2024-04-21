'use client';
import { theme } from '@/theme';
import {
  Box,
  Flex,
  Spacer,
  Tag,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { transparentize } from '@chakra-ui/theme-tools';
import hljs from 'highlight.js/lib/core';
import rust from 'highlight.js/lib/languages/rust';

export function CodeBlock({
  id,
  text,
  language,
}: {
  id: string;
  text: string;
  language: string;
}) {
  hljs.registerLanguage('rust', rust);
  const highlightedCode = hljs.highlight(text, { language: language }).value;

  const { colorMode } = useColorMode();
  if (colorMode == 'light') {
    import('highlight.js/styles/github.css');
  } else {
    import('highlight.js/styles/github-dark.css');
  }

  const bg = useColorModeValue(
    'gray.100',
    transparentize('gray.200', 0.16)(theme),
  );

  return (
    <Box id={id} rounded="md" fontSize={['xs', 'sm']} width="full" bg={bg}>
      <Flex>
        <Spacer />
        <Tag size={['sm', 'md']} textTransform="uppercase">
          {language}
        </Tag>
      </Flex>

      <Box overflow="scroll" px={[4, 6]} pb={[4, 6]} as="pre">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </Box>
    </Box>
  );
}
