import { Logo, Navigation } from '~/components';
import { OrderPopover } from './OrderPopover';

export function Header() {
  return (
    <header>
      <div className="container">
        <div className="grid grid-cols-3 items-center border-b pb-6 pt-6 xl:pt-12">
          <Logo />
          <Navigation className="hidden place-self-center text-neutral-500 md:block" />
          <OrderPopover className="place-self-end" />
        </div>
      </div>
    </header>
  );
}
