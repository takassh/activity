import { Code } from '@chakra-ui/react';

export function CodeBlock({ id, text }: { id: string; text: string }) {
  return (
    <Code
      id={id}
      overflow="scroll"
      rounded="md"
      fontSize={['xs', 'sm']}
      width="full"
      padding={['2', '4']}
      whiteSpace="pre"
    >
      {text}
    </Code>
  );
}
