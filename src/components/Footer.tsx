import { Logo, Navigation } from '~/components';

export function Footer() {
  return (
    <footer className="bg-neutral-100 py-10 md:py-16 xl:py-20">
      <div className="container">
        <div className="mb-8 flex items-center justify-between border-b pb-6 md:mb-10 xl:mb-12">
          <Logo size="lg" />
          <Navigation className="text-neutral-300" />
        </div>
        <div>
          <p className="text-sm text-neutral-300 md:text-base">2023 © Їжмо!</p>
        </div>
      </div>
    </footer>
  );
}
