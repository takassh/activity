'use client';
import { Box, Flex, Image, Link, Spacer, Stack, Text } from '@chakra-ui/react';

export function OGP({
  host,
  title,
  summary,
  imageUrl,
  faviconUrl,
  href,
}: {
  host: string;
  title: string;
  summary: string;
  imageUrl: string;
  faviconUrl: string;
  href: string;
}) {
  return (
    <Box
      maxWidth={800}
      borderWidth="1px"
      borderRadius="lg"
      height={[100, 130]}
      bg="bg"
    >
      <Link href={href}>
        <Flex direction="row" alignItems="start" height="100%">
          <Flex
            px={[4, 6]}
            py={[2, 4]}
            direction="column"
            height="100%"
            justifyContent="space-between"
          >
            <Text fontSize={['md', 'lg']} fontWeight="bold">
              {title}
            </Text>
            <Text fontSize={['sm', 'md']} fontWeight="normal" noOfLines={1}>
              {summary}
            </Text>
            <Stack direction="row">
              <Image
                src={faviconUrl}
                borderRadius="full"
                boxSize="18px"
                objectFit="cover"
                alt="favicon image"
              />
              <Text fontSize={['xs']} color="gray.500">
                {host}
              </Text>
            </Stack>
          </Flex>
          <Spacer />
          <Image
            src={imageUrl}
            height={'100%'}
            width={'100%'}
            maxW={[130, 220]}
            minW={[130, 220]}
            objectFit="cover"
            borderRightRadius={'lg'}
            display="block"
            alt="article image"
          />
        </Flex>
      </Link>
    </Box>
  );
}
