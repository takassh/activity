'use client';
import { Box } from '@chakra-ui/react';
import mermaid from 'mermaid';

export function Mermaid({
  colorMode,
  children,
}: {
  colorMode: string;
  children: string;
}) {
  mermaid.initialize({
    theme: colorMode == 'dark' ? 'dark' : 'default',
    fontFamily: 'Menlo',
    fontSize: 14,
    startOnLoad: true,
  });
  mermaid.contentLoaded();
  return (
    <Box className="mermaid" suppressHydrationWarning>
      {children}
    </Box>
  );
}
