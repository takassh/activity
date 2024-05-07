'use client';
import '@/app/extensions/date';
import { Top, isTop } from '@/app/types/top';
import { CustomGauge } from '@/app/ui/custom_gauge';
import {
  Box,
  Center,
  CircularProgress,
  Flex,
  Text,
  Wrap,
  WrapItem,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export function Charts() {
  const color = useColorModeValue('#1A202C', '#F7FAFC');
  const titleFontSize = useBreakpointValue({ base: 20, sm: 30 });
  const { lastMessage, readyState } = useWebSocket(
    'wss://takassh.shuttleapp.rs/top/receive',
  );

  if (!(readyState === ReadyState.OPEN && isTop(lastMessage?.data))) {
    return (
      <Center m={16}>
        <CircularProgress isIndeterminate color={color} />
      </Center>
    );
  }

  const top = JSON.parse(lastMessage?.data as unknown as string) as Top;

  return (
    <Flex direction="column">
      <Center position="sticky" top={0} bg="bg" zIndex={100}>
        <Text fontSize={['md', 'lg']} color="gray.500" m={[4, 8]}>
          {new Date(top.processes.datetime).toLocaleString()}
        </Text>
      </Center>
      <Wrap justify="center">
        <WrapItem>
          <Box maxW={['300', '400']}>
            <CustomGauge
              target={100 - top.cpu_usage.idle}
              total={100}
              title={'CPU\nUSAGE'}
              titleFontSize={titleFontSize}
              color={color}
            />
          </Box>
        </WrapItem>
        <WrapItem>
          <Box maxW={['300', '400']}>
            <CustomGauge
              target={top.disks.read}
              total={top.disks.read_total}
              title={'DISK\nREAD'}
              titleFontSize={titleFontSize}
              color={color}
            />
          </Box>
        </WrapItem>
        <WrapItem>
          <Box maxW={['300', '400']}>
            <CustomGauge
              target={top.disks.written}
              total={top.disks.written_total}
              title={'DISK\nWRITTEN'}
              titleFontSize={titleFontSize}
              color={color}
            />
          </Box>
        </WrapItem>
        <WrapItem>
          <Box maxW={['300', '400']}>
            <CustomGauge
              target={top.networks.packets_in}
              total={top.networks.in_total}
              title={'PACKETS\nIN'}
              titleFontSize={titleFontSize}
              color={color}
            />
          </Box>
        </WrapItem>
        <WrapItem>
          <Box maxW={['300', '400']}>
            <CustomGauge
              target={top.networks.packets_out}
              total={top.networks.out_total}
              title={'PACKETS\nOUT'}
              titleFontSize={titleFontSize}
              color={color}
            />
          </Box>
        </WrapItem>
        <WrapItem>
          <Box maxW={['300', '400']}>
            <CustomGauge
              target={top.phys_mem.used}
              total={16 * 1000 * 1000 * 1000}
              title={'PHYSICAL\nMEMORY'}
              titleFontSize={titleFontSize}
              color={color}
            />
          </Box>
        </WrapItem>
      </Wrap>
    </Flex>
  );
}
