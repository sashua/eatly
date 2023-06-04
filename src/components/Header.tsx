import Link from 'next/link';
import { Logo } from './Logo';

export function Header() {
  return (
    <header>
      <div className="container">
        <nav className="flex border-b py-6">
          <Logo />
          <div className="ml-auto flex gap-10">
            <Link href="/">Меню</Link>
            <Link href="/cart">Кошик</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
