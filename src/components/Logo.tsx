import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      className="flex items-center gap-3 text-violet-700 text-2xl font-semibold"
      href="/"
    >
      <div className="relative basis-10 shrink-0 aspect-square">
        <Image src="/logo.svg" alt="Виделка й ніж" fill />
      </div>
      Їжмо!
    </Link>
  );
}
