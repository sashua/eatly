import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { tv } from 'tailwind-variants';

const image = tv({
  base: 'relative overflow-hidden',
});

interface ImageProps extends Omit<NextImageProps, 'fill'> {
  fit?: 'cover' | 'contain';
}

export function Image({ className, fit = 'cover', ...props }: ImageProps) {
  return (
    <div className={image({ className })}>
      <NextImage className={`object-${fit}`} fill {...props} />
    </div>
  );
}
