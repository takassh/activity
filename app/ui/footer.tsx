'use client';
import {
  Box,
  Divider,
  HStack,
  Icon,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack mb={2}>
      <Divider />
      <HStack>
        <Text fontSize={['xs', 'md']}>©︎ 2024 Takashi Kasai</Text>
        <Box onClick={toggleColorMode} ml={2}>
          <Icon
            fontSize={['sm', 'md']}
            as={FontAwesomeIcon}
            icon={colorMode == 'light' ? faMoon : faSun}
          />
        </Box>
      </HStack>
    </VStack>
  );
}
