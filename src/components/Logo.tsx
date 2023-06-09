import Link from 'next/link';
import { tv, type VariantProps } from 'tailwind-variants';
import { Image } from './Image';

const logo = tv({
  slots: {
    base: 'flex items-center gap-3 font-semibold text-brand',
    image: 'aspect-square shrink-0',
  },
  variants: {
    size: {
      sm: {
        base: 'text-xl',
        image: 'w-10',
      },
      md: {
        base: 'text-2xl',
        image: 'w-12',
      },
      lg: {
        base: 'text-3xl',
        image: 'w-14',
      },
    },
  },
  defaultVariants: { size: 'md' },
});

type LogoVariants = VariantProps<typeof logo>;

interface LogoProps extends LogoVariants {
  className?: string;
}

export function Logo({ className, size }: LogoProps) {
  const classes = logo({ size });

  return (
    <Link className={classes.base({ className })} href="/">
      <Image
        className={classes.image()}
        src="/logo.svg"
        alt="Company logo"
        fit="contain"
      />
      <span>eatly</span>
    </Link>
  );
}
