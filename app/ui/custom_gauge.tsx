'use client';

import { GaugeConfig } from '@ant-design/plots';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Gauge = dynamic(
  () => import('@ant-design/plots').then(({ Gauge }) => Gauge),
  { ssr: false },
);

export function CustomGauge({
  target,
  total,
  title,
  titleFontSize,
  color,
}: {
  target: number;
  total: number;
  title: string;
  titleFontSize?: number;
  color: string;
}) {
  const cpuUsageConfig: GaugeConfig = {
    animate: false,
    data: {
      target: target,
      total: total,
      name: 'usage',
    },
    legend: false,
    tooltip: false,
    style: {
      textContent: (target: number, total: number) =>
        `${((target / total) * 100).toFixed(2)}%`,
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: title,
          x: '50%',
          y: '37%',
          textAlign: 'center',
          fontSize: titleFontSize,
          fontStyle: 'bold',
          fill: color,
        },
      },
    ],
  };

  return (
    <Box pointerEvents="none">
      <Gauge {...cpuUsageConfig} />
    </Box>
  );
}
