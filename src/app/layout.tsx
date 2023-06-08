import { Golos_Text } from 'next/font/google';
import { Footer, Header } from '~/components';
import './globals.css';
import Providers from './providers';

const golosText = Golos_Text({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-golos-text',
});

export const metadata = {
  title: 'Eatly',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" className={`${golosText.variable}`}>
      <body className="flex min-h-screen flex-col bg-neutral-50 font-sans text-neutral-950">
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
