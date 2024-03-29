import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MaxWidthWrapper from '@/components/containers/MaxWidthWrapper';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from '@/components/ui/toaster';
import AuthProvider from '@/providers/SessionProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pastebin Clone',
  description: 'Paste your code/notes and share with others.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <MaxWidthWrapper>{children}</MaxWidthWrapper>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
