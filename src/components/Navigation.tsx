import Link from 'next/link';
import { tv } from 'tailwind-variants';

const links = [
  {
    label: 'Menu',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/',
  },
  {
    label: 'Contact',
    href: '/',
  },
];

const navigation = tv({
  slots: {
    base: 'flex gap-10',
    link: 'px-2 py-1 transition-colors hover:text-brand',
  },
});

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const classes = navigation();

  return (
    <nav className={classes.base({ className })}>
      {links.map(({ label, href }, i) => (
        <Link className={classes.link()} href={href} key={i}>
          {label}
        </Link>
      ))}
    </nav>
  );
}