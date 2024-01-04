import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MaxWidthWrapper from '@/components/containers/MaxWidthWrapper';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
        <Toaster />
      </body>
    </html>
  );
}
