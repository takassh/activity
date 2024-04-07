import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

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
  },
  fonts: {
    heading:
      'Helvetica Neue, Helvetica, Hiragino Sans, Hiragino Kaku Gothic ProN, Arial, Yu Gothic, Meiryo, sans-serif',
    body: 'Noto Sans JP, Hiragino Kaku Gothic ProN, Proxima Nova, Verdana, 游ゴシック, YuGothic, Meiryo, sans-serif',
  },
  initialColorMode: 'dark',
  useSystemColorMode: true,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('gray.50', 'gray.800')(props),
      },
    }),
  },
});
