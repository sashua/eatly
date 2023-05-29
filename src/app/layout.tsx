import { Golos_Text } from "next/font/google";
import { Footer, Header } from "~/components";
import "./globals.css";

const golosText = Golos_Text({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-golos-text",
});

export const metadata = {
  title: "Eatly",
  description: "Enjoy foods all over the world",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" className={golosText.variable}>
      <body className="flex flex-col bg-gray-50 text-gray-800 font-primary min-h-screen">
        <Header />
        <main className="grow py-20">
          <div className="container">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
