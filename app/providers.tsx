'use client';

import { customTheme } from '@/theme';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import {
  ChakraProvider,
  ColorModeScript,
  cookieStorageManager,
} from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
      <UserProvider>
        <ColorModeScript
          initialColorMode={customTheme.config.initialColorMode}
          type="cookie"
        />
        <Analytics />
        <SpeedInsights />
        {children}
      </UserProvider>
    </ChakraProvider>
  );
}
