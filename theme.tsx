import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Inter, Open_Sans, Roboto_Mono } from 'next/font/google';

const open_sans = Open_Sans({
  subsets: ['latin'],
});

const inter = Inter({
  subsets: ['latin'],
});

export const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

export const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        _hover: { textDecoration: 'none' },
      },
    },
    Button: {
      baseStyle: {
        zIndex: 0,
      },
    },
    Code: {
      baseStyle: {
        fontFamily: roboto_mono.style.fontFamily,
        fontWeight: 500,
      },
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, ${inter.style.fontFamily}, ${open_sans.style.fontFamily}`,
    body: `-apple-system, BlinkMacSystemFont, ${inter.style.fontFamily}, ${open_sans.style.fontFamily}`,
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('gray.50', 'gray.800')(props),
      },
    }),
  },
  semanticTokens: {
    colors: {
      bg: {
        default: 'gray.50',
        _dark: 'gray.800',
      },
    },
  },
});
