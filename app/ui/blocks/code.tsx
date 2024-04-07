import { Code } from '@chakra-ui/react';

export function CodeBlock({ text }: { text: string }) {
  return (
    <Code
      overflow="scroll"
      rounded="md"
      fontSize={['xs', 'sm']}
      width="full"
      marginY={['0', '2']}
      padding={['2', '4']}
      whiteSpace="pre"
    >
      {text}
    </Code>
  );
}
