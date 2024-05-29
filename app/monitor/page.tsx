import { Metadata } from 'next';
import { Charts } from './charts';

export const metadata: Metadata = {
  title: 'Activity Monitor',
  icons: './favicon.ico',
  openGraph: {
    images: 'https://bucket.takassh.com/background.png',
  },
};

export default function Page() {
  return <Charts />;
}
