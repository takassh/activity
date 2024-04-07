'use client';

import { theme } from '@/theme';
import {
  ChakraProvider,
  ColorModeScript,
  localStorageManager,
} from '@chakra-ui/react';
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
  } as typeof localStorageManager;

  return (
    <ChakraProvider
      colorModeManager={
        typeof colorMode === 'string' ? cookieManager : localStorageManager
      }
      theme={theme}
    >
      <ColorModeScript
        initialColorMode={theme.initialColorMode}
        type={typeof colorMode === 'string' ? 'cookie' : 'localStorage'}
      />
      {children}
    </ChakraProvider>
  );
}
