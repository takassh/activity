import { Skeleton, Stack } from '@chakra-ui/react';

export default function PageSkelton() {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
}
