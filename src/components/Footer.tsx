import { Logo, Navigation } from '~/components';

export function Footer() {
  return (
    <footer className="bg-neutral-100 py-20">
      <div className="container">
        <div className="mb-12 flex items-center justify-between border-b pb-6">
          <Logo size="lg" />
          <Navigation className="text-neutral-300" />
        </div>
        <div>
          <p className="text-neutral-300">© 2023 EATLY All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
