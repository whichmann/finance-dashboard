import '@/app/ui/global.css';
import { inter } from './ui/fonts';
import { ThemeProvider } from './ui/theme-provider';
import Script from 'next/script';
import { cookies } from 'next/headers';

const THEME_COOKIE_KEY = 'finance-dashboard-theme';
const THEMES = ['light', 'dark', 'system'] as const;
 
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const storedTheme = (await cookies()).get(THEME_COOKIE_KEY)?.value;
  const initialTheme =
    storedTheme && THEMES.includes(storedTheme as (typeof THEMES)[number])
      ? storedTheme
      : undefined;

  return (
    <html lang="en" data-theme={initialTheme === 'system' ? undefined : initialTheme} suppressHydrationWarning>
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}