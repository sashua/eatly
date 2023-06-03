import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link
      className="flex items-center gap-3 text-2xl font-semibold text-violet-700"
      href="/"
    >
      <div className="relative aspect-square shrink-0 basis-10">
        <Image src="/logo.svg" alt="Виделка й ніж" fill />
      </div>
      Їжмо!
    </Link>
  );
}
