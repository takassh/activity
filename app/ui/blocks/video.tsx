import { Box, Center } from '@chakra-ui/react';

export function VideoBlock({ id, url }: { id: string; url: string }) {
  return (
    <Center>
      <Box
        id={id}
        as="video"
        maxWidth="full"
        controls
        src={url}
        objectFit="contain"
        sx={{
          aspectRatio: '16/9',
        }}
      />
      {/* <Box id={id} maxWidth="full">
        <Video rounded="lg" src={url} alt="image" />
      </Box> */}
    </Center>
  );
}
