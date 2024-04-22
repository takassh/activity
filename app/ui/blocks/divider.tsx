import { Divider } from '@chakra-ui/react';

export function CustomDivider({ id }: { id: string }) {
  return <Divider id={id} borderBottomWidth="1px" />;
}
