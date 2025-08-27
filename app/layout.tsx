import '../styles/globals.css';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'RTC Labs | Advanced WebRTC Conference Platform',
    template: '%s',
  },
  description:
    'RTC Labs is an advanced WebRTC platform that provides cutting-edge real-time communication solutions for modern applications.',
  twitter: {
    creator: '@rtclabs',
    site: '@rtclabs',
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://rtclabs.io',
    images: [
      {
        url: 'https://rtclabs.io/images/rtc-labs-open-graph.png',
        width: 2000,
        height: 1000,
        type: 'image/png',
      },
    ],
    siteName: 'RTC Labs',
  },
  icons: {
    icon: {
      rel: 'icon',
      url: '/images/rtc-labs-home.svg',
    },
    apple: [
      {
        rel: 'apple-touch-icon',
        url: '/images/rtc-labs-home.svg',
        sizes: '180x180',
      },
      { rel: 'mask-icon', url: '/images/rtc-labs-home.svg', color: '#00d4ff' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#00d4ff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-lk-theme="default">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
