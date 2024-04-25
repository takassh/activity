'use client';
import { Box, useToken } from '@chakra-ui/react';
import mermaid, { RenderResult } from 'mermaid';
import { useEffect, useState } from 'react';

export function Mermaid({
  id,
  colorMode,
  children,
}: {
  id: string;
  colorMode: string;
  children: string;
}) {
  const [svg, setSVG] = useState<string>();
  const light = useToken('colors', [
    'gray.500',
    'gray.100',
    'gray.700',
    'gray.900',
    'gray.100',
    'gray.300',
    'gray.300',
    'gray.800',
    'gray.900',
  ]);

  const dark = useToken('colors', [
    'gray.900',
    'gray.100',
    'gray.700',
    'gray.900',
    'gray.100',
    'gray.600',
    'gray.600',
    'gray.300',
    'gray.300',
  ]);

  mermaid.mermaidAPI.initialize({
    theme: 'base',
    themeVariables: {
      fontFamily: 'Menlo',
      fontSize: '20px',
      primaryColor: colorMode == 'light' ? light[0] : dark[0],
      primaryTextColor: colorMode == 'light' ? light[1] : dark[1],
      primaryBorderColor: colorMode == 'light' ? light[2] : dark[2],
      noteBkgColor: colorMode == 'light' ? light[3] : dark[3],
      noteTextColor: colorMode == 'light' ? light[4] : dark[4],
      tertiaryColor: colorMode == 'light' ? light[5] : dark[5],
      secondaryBorderColor: colorMode == 'light' ? light[6] : dark[6],
      secondaryTextColor: colorMode == 'light' ? light[7] : dark[7],
      secondaryColor: colorMode == 'light' ? light[5] : dark[5],
      tertiaryBorderColor: colorMode == 'light' ? light[6] : dark[6],
      tertiaryTextColor: colorMode == 'light' ? light[7] : dark[7],
      lineColor: colorMode == 'light' ? light[8] : dark[8],
      actorBorder: colorMode == 'light' ? light[8] : dark[8],
      signalColor: colorMode == 'light' ? light[7] : dark[7],
      signalTextColor: colorMode == 'light' ? light[7] : dark[7],
    },
    startOnLoad: false,
  });

  useEffect(() => {
    mermaid.render(`mermaid-${id}`, children).then((result: RenderResult) => {
      setSVG(result.svg);
    });
  }, [colorMode, children, id]);

  return (
    <Box key={id}>
      {svg && (
        <pre className={`mermaid`} dangerouslySetInnerHTML={{ __html: svg }} />
      )}
    </Box>
  );
}
