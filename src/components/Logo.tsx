import Image from 'next/image';
import Link from 'next/link';
import { tv, type VariantProps } from 'tailwind-variants';

const logo = tv({
  slots: {
    base: 'flex items-center gap-3 font-semibold text-brand',
    imageWrap: 'relative aspect-square shrink-0',
  },
  variants: {
    size: {
      sm: {
        base: 'text-xl',
        imageWrap: 'basis-10',
      },
      md: {
        base: 'text-2xl',
        imageWrap: 'basis-12',
      },
      lg: {
        base: 'text-3xl',
        imageWrap: 'basis-14',
      },
    },
  },
  defaultVariants: { size: 'md' },
});

type LogoVariants = VariantProps<typeof logo>;

interface LogoProps extends LogoVariants {}

export function Logo({ size }: LogoProps) {
  const classes = logo({ size });

  return (
    <Link className={classes.base()} href="/">
      <div className={classes.imageWrap()}>
        <Image src="/logo.svg" alt="Логотип" fill />
      </div>
      Їжмо!
    </Link>
  );
}
