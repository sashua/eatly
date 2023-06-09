import { Logo, Navigation } from '~/components';
import { OrderPopover } from './OrderPopover';

export function Header() {
  return (
    <header>
      <div className="container">
        <div className="flex items-center border-b pb-6 pt-12">
          <Logo className="mr-20" />
          <Navigation className="mr-auto text-neutral-500" />
          <OrderPopover />
        </div>
      </div>
    </header>
  );
}
