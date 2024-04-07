import { Box, Center, Image } from '@chakra-ui/react';

export function ImageBlock({ url }: { url: string }) {
  return (
    <Center>
      <Box maxWidth="full">
        <Image rounded="lg" src={url} alt="image" />
      </Box>
    </Center>
  );
}
