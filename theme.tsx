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
      notion_default: {
        default: 'gray.100',
        _dark: 'gray.700',
      },
      notion_blue_background: {
        default: 'blue.100',
        _dark: 'blue.700',
      },
      notion_brown_background: {
        default: 'brown.100',
        _dark: 'brown.700',
      },
      notion_gray_background: {
        default: 'gray.100',
        _dark: 'gray.700',
      },
      notion_green_background: {
        default: 'green.100',
        _dark: 'green.700',
      },
      notion_orange_background: {
        default: 'orange.100',
        _dark: 'orange.700',
      },
      notion_yellow_background: {
        default: 'yellow.100',
        _dark: 'yellow.700',
      },
      notion_pink_background: {
        default: 'pink.100',
        _dark: 'pink.700',
      },
      notion_purple_background: {
        default: 'purple.100',
        _dark: 'purple.700',
      },
      notion_red_background: {
        default: 'red.100',
        _dark: 'red.700',
      },
    },
  },
});
