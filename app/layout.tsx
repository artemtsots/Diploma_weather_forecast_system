import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Імпорт шрифту Poppins
import "./globals.css";
import { ThemeProvider } from "./Providers/ThemeProvider";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] }); // Використання шрифту Poppins

export const metadata: Metadata = {
  title: "Weather-forcasting-system",
  description: "Weather-forcasting-system for my diploma",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={poppins.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      </body>
      </html>
  );
}
