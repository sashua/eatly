import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { VariantProps, tv } from 'tailwind-variants';

const image = tv({
  slots: {
    base: 'relative overflow-hidden',
    image: '',
  },
  variants: {
    fit: {
      cover: {
        image: 'object-cover',
      },
      contain: {
        image: 'object-contain',
      },
    },
  },
  defaultVariants: { fit: 'cover' },
});

type ImageVariants = VariantProps<typeof image>;

interface ImageProps extends ImageVariants, Omit<NextImageProps, 'fill'> {}

export function Image({ className, fit, ...props }: ImageProps) {
  const classes = image({ fit });
  return (
    <div className={classes.base({ className })}>
      <NextImage className={classes.image()} fill {...props} />
    </div>
  );
}
