import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Theme";
import StudentHeader from "@/components/Student/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Classly - Student",
  description: "Classly is a class management app for teachers and students.",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col gap-10",
          inter.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <StudentHeader />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
