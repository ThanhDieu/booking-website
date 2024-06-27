import Image from 'next/image';
import Link from 'next/link';
interface BrandProps {
  image: string;
}
export default function Brand({ image }: BrandProps) {
  return (
    <Link href={'/'} className="block lg:h-10 h-8 pb-1">
      <Image
        className="w-full h-full my-auto"
        src={image || ' '}
        alt={'logo'}
        width={0}
        height={0}
        unoptimized
      />
    </Link>
  );
}
