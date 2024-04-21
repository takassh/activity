'use client';

import { customTheme } from '@/theme';
import {
  ChakraProvider,
  ColorModeScript,
  cookieStorageManager,
} from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import { setCookie } from 'cookies-next';

export function Providers({
  children,
  colorMode,
}: {
  children: React.ReactNode;
  colorMode?: string;
}) {
  const cookieManager = {
    type: 'cookie',
    ssr: true,
    get: (init) => colorMode ?? init,
    set: (value) => {
      setCookie('chakra-ui-color-mode', value);
    },
  } as typeof cookieStorageManager;

  return (
    <ChakraProvider colorModeManager={cookieManager} theme={customTheme}>
      <ColorModeScript
        initialColorMode={customTheme.config.initialColorMode}
        type="cookie"
      />
      <Analytics />
      {children}
    </ChakraProvider>
  );
}
