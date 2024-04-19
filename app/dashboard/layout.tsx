import { Box, Flex, HStack, Image, Link, Spacer } from '@chakra-ui/react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faChartLine, faX } from '@fortawesome/free-solid-svg-icons';
import { ClientIcon } from '../ui/client_icon';
import { Footer } from '../ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Flex py={8} px={[4, 8]}>
        <Link href="/dashboard">
          <Image
            borderRadius="full"
            boxSize={['40px', '50px']}
            src="/home.png"
            alt="Home"
          />
        </Link>
        <Spacer />
        <HStack spacing={8}>
          <Link href="https://github.com/takassh">
            <ClientIcon fontSize={['xl', '2xl']} icon={faGithub} />
          </Link>
          <Link href="https://twitter.com/octozuki">
            <ClientIcon fontSize={['xl', '2xl']} icon={faX} />
          </Link>
          <Link href="https://www.linkedin.com/in/takashi-kasai-217a1722b/">
            <ClientIcon fontSize={['xl', '2xl']} icon={faLinkedin} />
          </Link>
          <Link href="/dashboard/monitor">
            <ClientIcon fontSize={['xl', '2xl']} icon={faChartLine} />
          </Link>
        </HStack>
      </Flex>
      {children}
      <Footer />
    </Box>
  );
}
