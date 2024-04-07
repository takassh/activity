import { Wrap, WrapItem, WrapProps } from '@chakra-ui/react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { ClientIcon } from './client_icon';

export function Contacts({ ...props }: WrapProps) {
  return (
    <Wrap {...props} spacing={8}>
      <WrapItem>
        <Link href="https://github.com/takassh">
          <ClientIcon fontSize={['xl', '3xl']} icon={faGithub} />
        </Link>
      </WrapItem>
      <WrapItem>
        <ClientIcon fontSize={['xl', '3xl']} icon={faX} />
      </WrapItem>
      <WrapItem>
        <ClientIcon fontSize={['xl', '3xl']} icon={faLinkedin} />
      </WrapItem>
    </Wrap>
  );
}
