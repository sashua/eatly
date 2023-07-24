import { Logo, Navigation } from '~/components';
import { OrderPopover } from './OrderPopover';

export function Header() {
  return (
    <header>
      <div className="container">
        <div className="flex items-center justify-between border-b pb-6 pt-6 xl:pt-12">
          <Logo />
          <Navigation className="hidden text-neutral-500 md:block" />
          <OrderPopover />
        </div>
      </div>
    </header>
  );
}
