import { Box, Center, Image } from '@chakra-ui/react';

export function ImageBlock({ id, url }: { id: string; url: string }) {
  return (
    <Center>
      <Box id={id} maxWidth="full">
        <Image rounded="lg" src={url} alt="block image" />
      </Box>
    </Center>
  );
}
