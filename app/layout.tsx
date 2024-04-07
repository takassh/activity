import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Activity',
  description: 'Activities from takassh',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const colorMode = cookieStore.get('chakra-ui-color-mode');

  return (
    <html lang="en">
      <body>
        <Providers colorMode={colorMode?.value}>{children}</Providers>
      </body>
    </html>
  );
}
