import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ConfigureAmplifyClientSide from '@/app/components/ConfigureAmplify';
import AuthProvider from '@/contexts/AuthContext';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Made By Valentina',
  description: 'Ecommerce website for Valentina hand made creations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ConfigureAmplifyClientSide />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
