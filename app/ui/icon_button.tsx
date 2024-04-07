'use client';

import {
  Box,
  Center,
  Icon,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export function IconButton({
  icon,
  onClick,
}: {
  icon: IconProp;
  onClick?: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const textColor = useColorModeValue('black', 'white');
  const bgColor = useColorModeValue('white', 'black');
  return !isLoading ? (
    <Icon
      onClick={async () => {
        setIsLoading(true);
        if (onClick != null) {
          await onClick();
        }
        setIsLoading(false);
      }}
      borderRadius="40%"
      _hover={{ shadow: 'lg', cursor: 'pointer' }}
      padding={['2', '3']}
      fontSize={['4xl', '5xl']}
      as={FontAwesomeIcon}
      icon={icon}
      color={textColor}
      backgroundColor={bgColor}
    />
  ) : (
    <Box
      position="relative"
      height={['52px', '72px']}
      width={['52px', '72px']}
      borderRadius="40%"
      backgroundColor={bgColor}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translateY(-50%) translateX(-50%)"
      >
        <Center>
          <Spinner color={bgColor} />
        </Center>
      </Box>
    </Box>
  );
}
