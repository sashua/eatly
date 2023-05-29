import { Logo } from "./Logo";

interface FooterProps {}

export function Footer({}: FooterProps) {
  return (
    <footer className="bg-gray-200 py-6">
      <div className="container">
        <Logo />
      </div>
    </footer>
  );
}
