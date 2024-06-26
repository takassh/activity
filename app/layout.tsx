import { Box, Flex, HStack, Image, Link, Spacer } from '@chakra-ui/react';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faChartLine,
  faComment,
  faInfo,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { cookies } from 'next/headers';
import { Providers } from './providers';
import { Footer } from './ui/footer';
import { RefIcon } from './ui/ref_icon';

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const colorMode = cookieStore.get('chakra-ui-color-mode');
  return (
    <html lang="en">
      <body>
        <Providers colorMode={colorMode?.value}>
          <Box>
            <Flex py={8} px={[4, 8]}>
              <Link href="/">
                <Image
                  borderRadius="full"
                  boxSize={['40px', '50px']}
                  src="/logo-circle-small.webp"
                  alt="Home"
                />
              </Link>
              <Spacer />
              <HStack spacing={8}>
                <Link
                  href="/74c5e456-0feb-4049-a217-ba6ad67869ca"
                  aria-label="Go to about page"
                >
                  <RefIcon fontSize={['xl', '2xl']} icon={faInfo} />
                </Link>
                <Link href="/chat" aria-label="Go to chat page">
                  <RefIcon fontSize={['xl', '2xl']} icon={faComment} />
                </Link>
                <Link href="/monitor" aria-label="Go to monitor page">
                  <RefIcon fontSize={['xl', '2xl']} icon={faChartLine} />
                </Link>
                <Link
                  href="https://github.com/takassh"
                  aria-label="Go to Github"
                >
                  <RefIcon fontSize={['xl', '2xl']} icon={faGithub} />
                </Link>
                <Link
                  href="https://twitter.com/octozuki"
                  aria-label="Go to Twitter"
                >
                  <RefIcon fontSize={['xl', '2xl']} icon={faX} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/takashi-kasai-217a1722b/"
                  aria-label="Go to Linkedin"
                >
                  <RefIcon fontSize={['xl', '2xl']} icon={faLinkedin} />
                </Link>
              </HStack>
            </Flex>
            {children}
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
