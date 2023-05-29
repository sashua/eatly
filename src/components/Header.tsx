import Link from "next/link";
import { Logo } from "./Logo";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <header>
      <div className="container">
        <nav className="flex border-b py-6">
          <Logo />
          <div className="flex ml-auto gap-10">
            <Link href="/">Меню</Link>
            <Link href="/cart">Кошик</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
