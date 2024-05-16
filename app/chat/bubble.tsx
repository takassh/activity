'use client';
import { Flex, FlexProps, Icon, Image, Stack, Text } from '@chakra-ui/react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface BubbleProps extends FlexProps {
  message: string;
  isLLM?: boolean;
}

export function Bubble({ message, isLLM, ...props }: BubbleProps) {
  return (
    <Flex alignItems="top" {...props}>
      {isLLM ? (
        <Image
          borderRadius="full"
          boxSize={['30px', '40px']}
          src="/logo.png"
          alt="Home"
        />
      ) : (
        <Icon as={FontAwesomeIcon} icon={faUser} fontSize={['30px', '40px']} />
      )}
      <Stack ml={4}>
        <Text as="b">{isLLM ? 'Takashi' : 'You'}</Text>
        <Text>{message}</Text>
      </Stack>
    </Flex>
  );
}
