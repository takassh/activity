'use client';
import { evaluate } from '@/app/api/action';
import { ExecuteResponse } from '@/app/api/response';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Tag,
  theme,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { transparentize } from '@chakra-ui/theme-tools';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import hljs from 'highlight.js';
import { useState } from 'react';
import { RefIcon } from '../ref_icon';
import { Mermaid } from './mermaid';

export function CodeBlock({
  id,
  text,
  language,
}: {
  id: string;
  text: string;
  language: string;
}) {
  const bg = useColorModeValue(
    'gray.100',
    transparentize('gray.200', 0.16)(theme),
  );
  const { colorMode } = useColorMode();

  let codeBlock: React.ReactNode;
  if (language === 'mermaid') {
    codeBlock = (
      <Mermaid id={id} colorMode={colorMode}>
        {text}
      </Mermaid>
    );
  } else if (language == 'plain text') {
    codeBlock = <code>{text}</code>;
  } else {
    const highlightedCode = hljs.highlight(text, { language: language }).value;
    if (colorMode == 'light') {
      import('highlight.js/styles/github.css');
    } else {
      import('highlight.js/styles/github-dark.css');
    }

    codeBlock = <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
  }

  const [result, setResult] = useState<ExecuteResponse>();
  const [loading, setLoading] = useState(false);

  async function execute() {
    setLoading(true);
    const res = await evaluate(text);
    setResult(res);
    setLoading(false);
  }

  return (
    <Stack>
      <Box id={id} rounded="md" fontSize={['xs', 'sm']} width="full" bg={bg}>
        <Flex>
          <Spacer />
          {language === 'rust' && text.includes('fn main() {') && (
            <IconButton
              mx={2}
              variant="outline"
              size={['xs']}
              icon={<RefIcon icon={faPlay} />}
              onClick={execute}
              aria-label={''}
            />
          )}
          <Tag size={['sm', 'md']} textTransform="uppercase">
            {language}
          </Tag>
        </Flex>

        <Box overflow="scroll" px={[4, 6]} pb={[4, 6]} as="pre">
          {codeBlock}
        </Box>
      </Box>

      {(loading || result) && (
        <Accordion allowToggle defaultIndex={[0]}>
          <AccordionItem style={{ border: 'none' }}>
            <AccordionButton>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              {loading && (
                <Box
                  p={[4, 6]}
                  rounded="md"
                  fontSize={['xs', 'sm']}
                  width="full"
                  bg={bg}
                  overflow="scroll"
                >
                  Running...
                </Box>
              )}
              {result && (
                <Box
                  p={[4, 6]}
                  rounded="md"
                  fontSize={['xs', 'sm']}
                  width="full"
                  bg={bg}
                  as="pre"
                  overflow="scroll"
                >
                  {result.error ? result.error : result.result}
                </Box>
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </Stack>
  );
}
