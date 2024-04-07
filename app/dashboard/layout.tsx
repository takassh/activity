import { Box } from '@chakra-ui/react';
import { Footer } from '../ui/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      {children}
      <Footer />
    </Box>
  );
}
