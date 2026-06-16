import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DayForge | Daily execution',
  description: 'turn a chaotic day into a sharp execution plan with recovery buffers',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
