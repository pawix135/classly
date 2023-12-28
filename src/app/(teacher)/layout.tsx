import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/Theme';
import TeacherHeader from '@/components/Teacher/Header';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Classly - Teacher',
  description: 'Classly is a class management app for teachers and students.',
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          inter.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TeacherHeader />
          <main className="flex flex-col flex-grow">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
