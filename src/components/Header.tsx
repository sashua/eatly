import { Logo, Navigation } from '~/components';

export function Header() {
  return (
    <header>
      <div className="container">
        <div className="flex items-center border-b pb-6 pt-12">
          <Logo className="mr-20" />
          <Navigation className="text-neutral-500" />
        </div>
      </div>
    </header>
  );
}
